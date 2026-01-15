import { create } from "zustand";

import { StocksState } from "@/modules/stocks/presentation/interfaces";

export const useStocksStore = create<StocksState>((set, get) => ({
  stocks: {},

  getStocks: () => get().stocks,

  addStock: (symbol, priceAlert) => {
    const stocks = get().stocks;
    if (stocks[symbol]) return;

    set({
      stocks: {
        ...stocks,
        [symbol]: {
          symbol,
          price: 0,
          priceAlert,
          previousPrice: 0,
          isBelowAlert: false,
          history: [],
        },
      },
    });
  },

  removeStock: (symbol) => {
    const { [symbol]: _, ...rest } = get().stocks;
    set({ stocks: rest });
  },

  updatePrice: (symbol, price, isBelowAlert) => {
    const stock = get().stocks[symbol];
    if (!stock) return;

    set({
      stocks: {
        ...get().stocks,
        [symbol]: {
          ...stock,
          price,
          isBelowAlert,
          previousPrice: stock.price,
          history: [...stock.history, price].slice(-40),
        },
      },
    });
  },

  reset: () => set({ stocks: {} }),
}));
