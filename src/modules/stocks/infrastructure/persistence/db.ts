import Dexie, { type Table } from "dexie";

import { Stock } from "@/modules/stocks/domain/entitites";

export class StocksDatabase extends Dexie {
  stocks!: Table<Stock, string>;

  constructor() {
    super("StocksDatabase");
    this.version(1).stores({
      stocks: "symbol, price, priceAlert, isBelowAlert, isNotificationSent",
    });
  }
}

export const db = new StocksDatabase();
