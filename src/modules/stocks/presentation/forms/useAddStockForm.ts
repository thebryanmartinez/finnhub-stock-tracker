"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AddStockFormData, addStockSchema } from "./index";

export function useAddStockForm() {
  const form = useForm<AddStockFormData>({
    resolver: zodResolver(addStockSchema),
    defaultValues: {
      symbol: "GOOGL",
      priceAlert: 0,
    },
  });

  const onSubmit = async (data: AddStockFormData) => {
    try {
      console.log(data);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    form,
    onSubmit,
  };
}
