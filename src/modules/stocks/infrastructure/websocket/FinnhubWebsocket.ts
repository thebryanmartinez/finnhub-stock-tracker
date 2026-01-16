"use client";

import { useEffect, useRef } from "react";

import { sendStockAlertNotification } from "@/app/actions";
import { Trade } from "@/modules/stocks/domain/entitites";
import { strings } from "@/modules/stocks/presentation/localization";
import { useStockRepository } from "@/modules/stocks/presentation/state";

export const useStockWebSocket = (symbols: string[]) => {
  const socketRef = useRef<WebSocket | null>(null);
  const subscribedSymbolsRef = useRef<string[]>([]);
  const pendingUpdatesRef = useRef<Array<Trade>>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef(false);
  const pendingSymbolsRef = useRef<string[]>([]);
  const maxReconnectAttempts = 3;
  const reconnectDelay = 5000;

  const repository = useStockRepository();

  const connectWebSocket = () => {
    if (isConnectingRef.current || socketRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    isConnectingRef.current = true;
    socketRef.current = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
    );

    socketRef.current.onopen = () => {
      isConnectingRef.current = false;
      reconnectAttemptsRef.current = 0;

      symbols.forEach((symbol) => {
        socketRef.current?.send(JSON.stringify({ type: "subscribe", symbol }));
      });
      subscribedSymbolsRef.current = [...symbols];

      if (pendingSymbolsRef.current.length > 0) {
        pendingSymbolsRef.current.forEach((symbol) => {
          if (!subscribedSymbolsRef.current.includes(symbol)) {
            socketRef.current?.send(JSON.stringify({ type: "subscribe", symbol }));
            subscribedSymbolsRef.current.push(symbol);
          }
        });
        pendingSymbolsRef.current = [];
      }
    };

    socketRef.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "trade" && message.data) {
          message.data.forEach((trade: Trade) => {
            pendingUpdatesRef.current.push({
              s: trade.s,
              p: trade.p,
              t: trade.t,
              v: trade.v,
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    socketRef.current.onclose = () => {
      isConnectingRef.current = false;
      attemptReconnect();
    };

    socketRef.current.onerror = () => {
      isConnectingRef.current = false;
    };
  };

  const attemptReconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (reconnectAttemptsRef.current < maxReconnectAttempts) {
      reconnectAttemptsRef.current++;

      reconnectTimeoutRef.current = setTimeout(() => {
        connectWebSocket();
      }, reconnectDelay);
    }
  };

  const updateSubscriptions = (newSymbols: string[]) => {
    if (socketRef.current?.readyState !== WebSocket.OPEN) {
      pendingSymbolsRef.current = newSymbols;
      return;
    }

    const currentSubscribed = subscribedSymbolsRef.current;
    const toUnsubscribe = currentSubscribed.filter((sym) => !newSymbols.includes(sym));
    const toSubscribe = newSymbols.filter((sym) => !currentSubscribed.includes(sym));

    toUnsubscribe.forEach((symbol) => {
      socketRef.current?.send(JSON.stringify({ type: "unsubscribe", symbol }));
    });

    toSubscribe.forEach((symbol) => {
      socketRef.current?.send(JSON.stringify({ type: "subscribe", symbol }));
    });

    subscribedSymbolsRef.current = [...newSymbols];
  };

  const processPendingUpdates = async () => {
    const updates = [...pendingUpdatesRef.current];
    pendingUpdatesRef.current = [];

    for (const trade of updates) {
      const stock = repository.getStocks()[trade.s];
      if (stock) {
        const isBelowAlert = trade.p < stock.priceAlert;

        if (isBelowAlert && !stock.isBelowAlert && !stock.isNotificationSent) {
          try {
            await sendStockAlertNotification(stock.symbol, stock.priceAlert);
            repository.markNotificationSent(stock.symbol);
          } catch (error) {
            console.error(strings.notifications.errors.failedToSend, error);
          }
        }

        repository.updatePrice(trade.s, Number(trade.p.toFixed(2)), isBelowAlert);
      }
    }
  };

  useEffect(() => {
    if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
      connectWebSocket();
    } else if (socketRef.current.readyState === WebSocket.OPEN) {
      updateSubscriptions(symbols);
    } else if (socketRef.current.readyState === WebSocket.CONNECTING) {
      pendingSymbolsRef.current = symbols;
    }
  }, [symbols]);

  useEffect(() => {
    intervalRef.current = setInterval(processPendingUpdates, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [repository]);

  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);
};
