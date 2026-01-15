"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { AddStockFormData, addStockSchema } from "@/modules/stocks/presentation/forms";
import { strings } from "@/modules/stocks/presentation/localization";

export function useAddStockForm(onAddStock: (symbol: string, priceAlert: number) => void) {
  const form = useForm<AddStockFormData>({
    resolver: zodResolver(addStockSchema) as any,
    defaultValues: {
      symbol: "GOOGL",
      priceAlert: 0,
    },
  });

  const onSubmit: SubmitHandler<AddStockFormData> = (data) => {
    try {
      onAddStock(data.symbol, data.priceAlert);
      form.reset();
    } catch {
      toast.error(strings.form.errors.errorAddingStock);
    }
  };

  return {
    form,
    onSubmit,
  };
}
