import { Trash2 } from "lucide-react";

import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/modules/shared/ui";
import { Stock } from "@/modules/stocks/domain/entitites";
import { strings } from "@/modules/stocks/presentation/localization";

export const WatchlistItem = ({
  stock,
  onRemove,
}: {
  stock: Stock;
  onRemove: (symbol: string) => void;
}) => {
  const handleRemoveStock = () => {
    onRemove(stock.symbol);
  };

  return (
    <Item variant='outline'>
      <ItemContent>
        <ItemTitle className='font-bold'>{stock.symbol}</ItemTitle>
        <ItemDescription className='text-xs'>
          {strings.watchlist.priceAlert.replace("{priceAlert}", stock.priceAlert.toString())}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant='ghost'
          size='icon'
          className='cursor-pointer hover:bg-red-100'
          onClick={handleRemoveStock}
        >
          <Trash2 />
        </Button>
      </ItemActions>
    </Item>
  );
};
