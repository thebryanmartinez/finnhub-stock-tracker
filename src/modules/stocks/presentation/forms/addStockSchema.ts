import { z } from "zod";

import { STOCK_OPTIONS } from "../constants";

export const addStockSchema = z.object({
  symbol: z.enum(STOCK_OPTIONS.map((option) => option.value) as [string, ...string[]]),
  priceAlert: z.coerce.number().gt(0, "Price alert must be greater than 0"),
});

export type AddStockFormData = z.infer<typeof addStockSchema>;
