"use client";

import React, { ReactNode, createContext, useContext } from "react";

import { IStockRepository } from "../../domain/repositories/IStockRepository";
import { useStocksStore } from "./stocksStore";

interface StockRepositoryProviderProps {
  children: ReactNode;
}

const StockRepositoryContext = createContext<IStockRepository | null>(null);

export const StockRepositoryProvider: React.FC<StockRepositoryProviderProps> = ({ children }) => {
  const repository = useStocksStore() as IStockRepository;
  return (
    <StockRepositoryContext.Provider value={repository}>{children}</StockRepositoryContext.Provider>
  );
};

export const useStockRepository = () => {
  const context = useContext(StockRepositoryContext);
  if (!context) throw new Error("useStockRepository must be used within StockRepositoryProvider");
  return context;
};
