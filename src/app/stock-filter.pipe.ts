import { Pipe, PipeTransform } from '@angular/core';
import Stock from './models/Stock';

@Pipe({
  name: 'stockFilter'
})
export class StockFilterPipe implements PipeTransform {

  transform(stocks: Array<Stock>, isFollowingFilter: boolean, isCanBuy: boolean, funds: number, follwingList: Array<string>): any {
    let results: Array<Stock> = stocks;

    if (isCanBuy) {
      results = stocks.filter(stock => stock.currentPrice < funds);        
    }

    return results;
  }
}
