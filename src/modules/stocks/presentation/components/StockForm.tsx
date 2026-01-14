"use client";

import { Plus } from "lucide-react";
import { Controller } from "react-hook-form";

import {
  Button,
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/modules/shared/ui";

import {
  ADD_STOCK_FORM_ID,
  PRICE_ALERT_INPUT,
  STOCK_OPTIONS,
  STOCK_SYMBOL_SELECT,
} from "../constants";
import { useAddStockForm } from "../forms";
import { strings } from "../localization";

export const StockForm = () => {
  const { form, onSubmit } = useAddStockForm();

  return (
    <form id={ADD_STOCK_FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className='gap-4'>
        <FieldLegend className='-mb-2 font-bold'>Add to watchlist</FieldLegend>
        <Controller
          name='symbol'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation='responsive' className='gap-2' data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor={STOCK_SYMBOL_SELECT} className='text-sm'>
                  {strings.form.symbol.label}
                </FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
              <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id={STOCK_SYMBOL_SELECT} aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent position='item-aligned'>
                  <SelectSeparator />
                  {STOCK_OPTIONS.map((stock) => (
                    <SelectItem key={stock.value} value={stock.value}>
                      {stock.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        <Controller
          name='priceAlert'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className='gap-2'>
              <FieldLabel htmlFor={PRICE_ALERT_INPUT}>{strings.form.priceAlert.label}</FieldLabel>
              <Input
                {...field}
                id={PRICE_ALERT_INPUT}
                aria-invalid={fieldState.invalid}
                placeholder='ex. 150.00'
                autoComplete='off'
                type='number'
                step='0.01'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button form={ADD_STOCK_FORM_ID} className='w-full' type='submit'>
          <Plus className='mr-2' />
          {strings.form.buttons.addStock}
        </Button>
      </FieldGroup>
    </form>
  );
};
