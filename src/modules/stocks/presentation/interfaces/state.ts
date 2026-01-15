import { Stock } from "@/modules/stocks/domain/entitites";

export type StocksState = {
  stocks: Record<string, Stock>;

  addStock: (symbol: string, priceAlert: number) => void;
  removeStock: (symbol: string) => void;
  updatePrice: (symbol: string, price: number, isBelowAlert: boolean) => void;
  reset: () => void;
};
