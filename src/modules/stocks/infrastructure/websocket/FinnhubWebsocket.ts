"use client";

import { useEffect, useRef } from "react";

import { Trade } from "@/modules/stocks/domain/entitites";
import { useStockRepository } from "@/modules/stocks/presentation/state";

export const useStockWebSocket = (symbols: string[]) => {
  const socketRef = useRef<WebSocket | null>(null);
  const subscribedSymbolsRef = useRef<string[]>([]);
  const pendingUpdatesRef = useRef<Array<Trade>>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 3;
  const reconnectDelay = 5000;

  const repository = useStockRepository();

  const connectWebSocket = () => {
    socketRef.current = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
    );

    socketRef.current.onopen = () => {
      reconnectAttemptsRef.current = 0;

      symbols.forEach((symbol) => {
        socketRef.current?.send(JSON.stringify({ type: "subscribe", symbol }));
      });
      subscribedSymbolsRef.current = [...symbols];
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
      attemptReconnect();
    };

    socketRef.current.onerror = (error) => {
      attemptReconnect();
    };
  };

  const attemptReconnect = () => {
    if (reconnectAttemptsRef.current < maxReconnectAttempts) {
      reconnectAttemptsRef.current++;
      setTimeout(() => {
        connectWebSocket();
      }, reconnectDelay);
    }
  };

  const updateSubscriptions = (newSymbols: string[]) => {
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

  const processPendingUpdates = () => {
    const updates = [...pendingUpdatesRef.current];
    pendingUpdatesRef.current = [];

    updates.forEach((trade) => {
      const stock = repository.getStocks()[trade.s];
      if (stock) {
        const isBelowAlert = trade.p < stock.priceAlert;
        repository.updatePrice(trade.s, Number(trade.p.toFixed(2)), isBelowAlert);
      }
    });
  };

  useEffect(() => {
    if (!socketRef.current) {
      connectWebSocket();
    }

    updateSubscriptions(symbols);
  }, [symbols]);

  useEffect(() => {
    intervalRef.current = setInterval(processPendingUpdates, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);
};
