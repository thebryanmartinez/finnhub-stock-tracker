"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/modules/shared/ui";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/modules/shared/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/shared/ui/select";
import { Stock } from "@/modules/stocks/domain/entitites";
import { useStockChart } from "@/modules/stocks/presentation/hooks/useStockChart";
import { strings } from "@/modules/stocks/presentation/localization";

export const StockChart = ({ stocks }: { stocks: Stock[] }) => {
  const { selectedSymbol, setSelectedSymbol, selectedStock, chartData, yDomain, chartConfig } =
    useStockChart(stocks);

  if (stocks.length === 0) {
    return (
      <Empty className='border border-dashed'>
        <EmptyHeader>
          <EmptyTitle className='text-base'>{strings.chart.empty.title}</EmptyTitle>
          <EmptyDescription className='text-sm'>{strings.chart.empty.description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Card className='w-full flex-1 flex flex-col'>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <CardTitle>{strings.chart.title}</CardTitle>
            <CardDescription>
              {selectedStock
                ? `${selectedStock.symbol} ${strings.chart.priceOverTime}`
                : strings.chart.noStockSelected}
            </CardDescription>
          </div>
          {stocks.length > 0 && (
            <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder={strings.chart.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {stocks.map((stock) => (
                  <SelectItem key={stock.symbol} value={stock.symbol}>
                    {stock.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent className='flex-1 min-h-0'>
        <ChartContainer config={chartConfig} className='w-full'>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='time'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              domain={yDomain}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${Number(value).toFixed(2)}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey='price'
              type='linear'
              isAnimationActive={false}
              stroke='var(--chart-1)'
              strokeWidth={2}
              dot={{
                fill: "var(--chart-1)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
