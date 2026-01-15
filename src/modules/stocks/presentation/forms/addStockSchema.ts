import { z } from "zod";

import { STOCK_OPTIONS } from "@/modules/stocks/presentation/constants";
import { strings } from "@/modules/stocks/presentation/localization";

export const addStockSchema = z.object({
  symbol: z.enum(STOCK_OPTIONS.map((option) => option.value) as [string, ...string[]]),
  priceAlert: z.coerce.number().gt(0, strings.form.errors.priceAlert),
});

export type AddStockFormData = z.infer<typeof addStockSchema>;
