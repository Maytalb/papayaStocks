import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import Stock from '../models/Stock';
import { StockMarketService } from '../stock-market.service';
import MyStock from '../models/MyStock';

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.css']
})
export class MyPortfolioComponent implements OnInit {
  @Input('myStocks') myStocks: Array<MyStock>;
  @Output('sellBuyStock') sellBuyStock: EventEmitter<any> = new EventEmitter();

  constructor(private stockmarket: StockMarketService) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    let symbols: Array<string> = [];
    const len: number = this.myStocks.length;

    if (len > 0) {
      symbols = this.myStocks.map(item => item.symbol);

      this.stockmarket.stocksInformation(symbols).subscribe((response: any) => {
        const stocks: Array<Stock> = response.stocks;
        for (let j = 0; j < this.myStocks.length; j++) {
          var currFullStockInfo = stocks.find(item => item.symbol === this.myStocks[j].symbol);
          this.myStocks[j].name = currFullStockInfo.name;
          this.myStocks[j].profitability = currFullStockInfo.currentPrice - this.myStocks[j].purchasePrice;
        }
      });
    }
  }

  sell(symbol: string) {
    this.stockmarket.sellStock(symbol).subscribe((response: any) => {
      this.sellBuyStock.emit(response.funds);
    });
  }
}
