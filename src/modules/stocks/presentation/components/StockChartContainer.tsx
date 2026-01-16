"use client";

import { useEffect, useState } from "react";

import { useStockWebSocket } from "@/modules/stocks/infrastructure/websocket/FinnhubWebsocket";
import { StockChart } from "@/modules/stocks/presentation/components";
import { useStocksPersistence } from "@/modules/stocks/presentation/hooks";
import { useStockRepository } from "@/modules/stocks/presentation/state/StockRepositoryProvider";

export const StockChartContainer = () => {
  const { isInitialized } = useStocksPersistence();
  const repository = useStockRepository();
  const stocks = repository.getStocks();
  const stockList = Object.values(stocks);
  const stockSymbols = Object.keys(stocks);
  const [shouldConnect, setShouldConnect] = useState(false);

  useEffect(() => {
    if (isInitialized) {
      setShouldConnect(true);
    }
  }, [isInitialized]);

  useStockWebSocket(shouldConnect ? stockSymbols : []);

  return (
    <div className='flex-1 w-full'>
      <StockChart stocks={stockList} />
    </div>
  );
};
