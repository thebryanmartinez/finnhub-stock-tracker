export type Stock = {
  symbol: string;
  price: number;
  priceAlert: number;
  isBelowAlert: boolean;
  history: number[];
  previousPrice: number;
  isNotificationSent: boolean;
};
