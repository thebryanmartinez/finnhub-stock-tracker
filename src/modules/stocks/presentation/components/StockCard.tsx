import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/modules/shared/ui";
import { Badge } from "@/modules/shared/ui";
import { Stock } from "@/modules/stocks/domain/entitites";
import { strings } from "@/modules/stocks/presentation/localization";

export const StockCard = ({ stock }: { stock: Stock }) => {
  const cardColorClass = stock.isBelowAlert
    ? "border-red-200 bg-red-50/50"
    : "border-green-200 bg-green-50/50";

  const priceChange = stock.price - stock.previousPrice;
  const priceChangePercent =
    stock.previousPrice > 0 ? ((priceChange / stock.previousPrice) * 100).toFixed(2) : "0.00";

  const changeBadgeVariant = priceChange >= 0 ? "default" : "destructive";
  const changeSymbol = priceChange >= 0 ? "+" : "";

  return (
    <Card className={cardColorClass}>
      <CardHeader className='pb-3'>
        <CardTitle className='text-xl font-bold text-gray-900'>{stock.symbol}</CardTitle>
        <CardAction className='text-xs text-muted-foreground flex items-center gap-1'>
          {strings.card.target}
          <span className='text-sm font-bold'>${stock.priceAlert.toFixed(2)}</span>
        </CardAction>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='text-3xl font-bold text-gray-900'>${stock.price.toFixed(2)}</div>
      </CardContent>

      <CardFooter className='pt-3'>
        <Badge variant={changeBadgeVariant} className='text-xs'>
          {changeSymbol}
          {priceChange.toFixed(2)} ({changeSymbol}
          {priceChangePercent}%)
        </Badge>
      </CardFooter>
    </Card>
  );
};
