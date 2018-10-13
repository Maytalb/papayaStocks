import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import Stock from '../models/Stock';
import { StockMarketService } from '../stock-market.service';
import MyStock from '../models/MyStock';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  stocks: Array<Stock>;
  isCanBuyFilter: boolean = false;
  isFollowingFilter: boolean = false;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  searchVal: string;
  follwingList: Array<string> = [];

  @Input('allStocks') allStocks: Array<Stock>;
  @Input('myStocks') myStocks: Array<MyStock>;
  @Input('funds') funds: number;
  @Output('sellBuyStock') sellBuyStock: EventEmitter<any> = new EventEmitter();

  constructor(private stockmarket: StockMarketService) { }

  ngOnInit(): void {
    this.searchStocks();
  }

  ngOnChanges(): void {
    this.searchStocks(this.searchVal);
  }

  private searchStocks(value: string = ""): void {
    if (this.isFollowingFilter) {
      this.stockmarket.stocksInformation(this.follwingList).subscribe((response: any) => {
        response.stocks.forEach(item => {
          item.isFollowing = true;
          item.canBuy = this.canBuy(item);
          item.canSell = this.canSell(item);
          item.startOfCommerce = new Date(item.startOfCommerce).getTime();
        });
        
        if (this.isDefined(value) && value != '') {
          value = value.toLowerCase();
          this.stocks = response.stocks.filter(item => item.name.toLowerCase().includes(value));
        } else {
          this.stocks = response.stocks;
        }
      });
    } else {
      this.stockmarket.search(value).subscribe((response: any) => {
        response.stocks.forEach(item => {
          item.canBuy = this.canBuy(item);
          item.canSell = this.canSell(item);
          item.isFollowing = this.follwingList.includes(item.symbol);
          item.startOfCommerce = new Date(item.startOfCommerce).getTime();
        });

        this.stocks = response.stocks;
      });
    }
  }

  onKey(event): void {
    this.searchVal = event.target.value;
    this.searchStocks(this.searchVal);
  }

  buy(stockSymbol): void {
    this.stockmarket.buyStock(stockSymbol).subscribe((result) => {
      this.sellBuyStock.emit(result.funds);
    });
  }

  sell(stockSymbol): void {    
    this.stockmarket.sellStock(stockSymbol).subscribe((result: any) => {
      this.sellBuyStock.emit(result.funds);
    });
  }

  canSell(stock): boolean {
    const stk = this.myStocks.find(stc => stc.symbol == stock.symbol);
    
    if (this.isDefined(stk)) {
      return true;
    }

    return false;
  }

  canBuy(stock: Stock): boolean {
    if (stock.currentPrice > this.funds) {
      return false;
    }

    if (this.isDefined(this.myStocks)) {
      const stk =  this.myStocks.find(stc => stc.symbol == stock.symbol);
      
      if (this.isDefined(stk)) {
        return false;
      }
    }

    return true;
  }

  private isDefined(value: any) {
    return typeof value != 'undefined';
  }

  private isUndefined(value: any): boolean {
    return typeof value == 'undefined';
  }

  isFollowing(event, symbol): void {
    if (event.target.checked) {
      this.follwingList.push(symbol);
    } else {
      const index = this.follwingList.findIndex(item => item == symbol);
      
      if (index > -1) {
        this.follwingList.splice(index, 1);
      }
    }
  }

  getFollowing(): void {
    this.isFollowingFilter = !this.isFollowingFilter;
    this.searchStocks(this.searchVal);
  }
}
