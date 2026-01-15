"use client";

import { useStockWebSocket } from "@/modules/stocks/infrastructure/websocket/FinnhubWebsocket";
import { StockChart } from "@/modules/stocks/presentation/components";
import { useStockRepository } from "@/modules/stocks/presentation/state/StockRepositoryProvider";

export const StockChartContainer = () => {
  const repository = useStockRepository();
  const stocks = repository.getStocks();
  const stockList = Object.values(stocks);
  const stockSymbols = Object.keys(stocks);

  useStockWebSocket(stockSymbols);

  return (
    <div className='flex-1 w-full'>
      <StockChart stocks={stockList} />
    </div>
  );
};
