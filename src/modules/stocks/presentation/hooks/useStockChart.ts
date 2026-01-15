import { useEffect, useState } from "react";

import { type ChartConfig } from "@/modules/shared/ui";
import { Stock } from "@/modules/stocks/domain/entitites";

const transformSingleStockData = (stock: Stock) => {
  if (stock.history.length === 0) return [];

  const now = Date.now();
  return stock.history.map((price, index) => ({
    time: new Date(now - (stock.history.length - index - 1) * 2000).toLocaleTimeString(),
    price: price,
  }));
};

const calculateYDomain = (stock: Stock | undefined): [number, number] => {
  if (!stock || stock.history.length === 0) return [0, 100];

  const minPrice = Math.min(...stock.history);
  const maxPrice = Math.max(...stock.history);

  const padding = (maxPrice - minPrice) * 0.05;

  return [Math.max(0, minPrice - padding), maxPrice + padding];
};

export const useStockChart = (stocks: Stock[]) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(
    stocks.length > 0 ? stocks[0].symbol : ""
  );

  useEffect(() => {
    if (stocks.length > 0 && !stocks.find((s) => s.symbol === selectedSymbol)) {
      setSelectedSymbol(stocks[0].symbol);
    }
  }, [stocks, selectedSymbol]);

  const selectedStock = stocks.find((s) => s.symbol === selectedSymbol);
  const chartData = selectedStock ? transformSingleStockData(selectedStock) : [];
  const yDomain = calculateYDomain(selectedStock);

  const chartConfig: ChartConfig = {
    price: {
      label: `${selectedSymbol}:`,
      color: "var(--chart-1)",
    },
  };

  return {
    selectedSymbol,
    setSelectedSymbol,
    selectedStock,
    chartData,
    yDomain,
    chartConfig,
  };
};
