import { create } from "zustand";

import { DexieStockRepository } from "@/modules/stocks/infrastructure/persistence";
import { StocksState } from "@/modules/stocks/presentation/interfaces";

const repository = new DexieStockRepository();

export const useStocksStore = create<StocksState>((set, get) => ({
  stocks: {},

  getStocks: () => get().stocks,

  addStock: async (symbol, priceAlert) => {
    const stocks = get().stocks;
    if (stocks[symbol]) return;

    const newStock = {
      symbol,
      price: 0,
      priceAlert,
      previousPrice: 0,
      isBelowAlert: false,
      isNotificationSent: false,
      history: [],
    };

    set({
      stocks: {
        ...stocks,
        [symbol]: newStock,
      },
    });

    await repository.addStock(symbol, priceAlert);
  },

  removeStock: async (symbol) => {
    const { [symbol]: _, ...rest } = get().stocks;
    set({ stocks: rest });
    await repository.removeStock(symbol);
  },

  updatePrice: async (symbol, price, isBelowAlert) => {
    const stock = get().stocks[symbol];
    if (!stock) return;

    const updatedStock = {
      ...stock,
      price,
      isBelowAlert,
      previousPrice: stock.price,
      history: [...stock.history, price].slice(-40),
    };

    set({
      stocks: {
        ...get().stocks,
        [symbol]: updatedStock,
      },
    });

    await repository.updatePrice(symbol, price, isBelowAlert);
  },

  markNotificationSent: async (symbol) => {
    const stock = get().stocks[symbol];
    if (!stock) return;

    set({
      stocks: {
        ...get().stocks,
        [symbol]: {
          ...stock,
          isNotificationSent: true,
        },
      },
    });

    await repository.markNotificationSent(symbol);
  },
}));

// Initialize store from IndexedDB
export const initializeStocksStore = async () => {
  const stocks = await repository.getStocks();
  useStocksStore.setState({ stocks });
};
