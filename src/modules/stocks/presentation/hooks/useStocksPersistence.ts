"use client";

import { useEffect, useState } from "react";

import { initializeStocksStore } from "@/modules/stocks/presentation/state";

export const useStocksPersistence = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await initializeStocksStore();
      setIsInitialized(true);
    };

    initialize();
  }, []);

  return { isInitialized };
};
