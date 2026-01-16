import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/modules/shared/ui";
import { Badge } from "@/modules/shared/ui";
import { Stock } from "@/modules/stocks/domain/entitites";
import { strings } from "@/modules/stocks/presentation/localization";

export const StockCard = ({ stock }: { stock: Stock }) => {
  const cardColorClass = stock.isBelowAlert
    ? "border-red-200 bg-red-50/50 dark:border-red-900/60 dark:bg-red-950/30"
    : "border-green-200 bg-green-50/50 dark:border-green-900/60 dark:bg-green-950/30";

  const priceChange = stock.price - stock.previousPrice;
  const priceChangePercent =
    stock.previousPrice > 0 ? ((priceChange / stock.previousPrice) * 100).toFixed(2) : "0.00";

  const changeBadgeVariant = priceChange >= 0 ? "default" : "destructive";
  const changeSymbol = priceChange >= 0 ? "+" : "";

  return (
    <Card className={`${cardColorClass} p-2 sm:p-4`}>
      <CardHeader className='pb-1 sm:pb-3 px-2 sm:px-4'>
        <CardTitle className='text-base sm:text-xl font-bold text-foreground'>
          {stock.symbol}
        </CardTitle>
        <CardAction className='text-xs text-muted-foreground flex items-center gap-1'>
          {strings.card.target}
          <span className='text-xs sm:text-sm font-bold'>${stock.priceAlert.toFixed(2)}</span>
        </CardAction>
      </CardHeader>
      <CardContent className='space-y-1 sm:space-y-4 py-1 sm:py-4 px-2 sm:px-4'>
        <div className='text-xl sm:text-3xl font-bold text-foreground'>
          {stock.price === 0 ? (
            <Skeleton className='h-7 sm:h-9 w-24' />
          ) : (
            `$${stock.price.toFixed(2)}`
          )}
        </div>
      </CardContent>

      <CardFooter className='pt-1 sm:pt-3 px-2 sm:px-4'>
        {stock.price === 0 ? (
          <Skeleton className='h-5 w-28' />
        ) : (
          <Badge variant={changeBadgeVariant} className='text-xs'>
            {changeSymbol}
            {priceChange.toFixed(2)} ({changeSymbol}
            {priceChangePercent}%)
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};
