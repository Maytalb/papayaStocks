import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockMarketService {

  constructor(private http: HttpClient) { }

  stocksInformation(symbol: Array<string>) {
    return this.http.get('http://18.224.25.44/stock-exchange-service/market', {
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      params: {
        symbol: symbol
      }
    });
  }

  buyStock(stockSymbol: string) : any{
    return this.http.post('http://18.224.25.44/stock-exchange-service/market/buy', {
      stockSymbol: stockSymbol,
      stockQuantity: 1
    }, {
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }
    });
  }

  search(searchString: string) {
    return this.http.post('http://18.224.25.44/stock-exchange-service/market/search', {
      searchString: searchString
    }, {
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }
    });
  }

  sellStock(stockSymbol: string) {
    return this.http.post('http://18.224.25.44/stock-exchange-service/market/sell', {
      stockSymbol: stockSymbol      
    }, {
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }
    });
  }
}
