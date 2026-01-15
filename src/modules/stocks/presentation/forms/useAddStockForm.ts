"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { strings } from "../localization";
import { useStocksStore } from "../state";
import { AddStockFormData, addStockSchema } from "./index";

export function useAddStockForm() {
  const addStock = useStocksStore((state) => state.addStock);
  const form = useForm<AddStockFormData>({
    resolver: zodResolver(addStockSchema),
    defaultValues: {
      symbol: "GOOGL",
      priceAlert: 0,
    },
  });

  const onSubmit = async (data: AddStockFormData) => {
    try {
      addStock(data.symbol, data.priceAlert);
      form.reset();
    } catch (error: unknown) {
      toast.error(strings.form.errors.errorAddingStock);
    }
  };

  return {
    form,
    onSubmit,
  };
}
