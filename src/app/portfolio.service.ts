import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  portfolio() {
    return this.http.get('http://18.224.25.44/stock-exchange-service/portfolio', {
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }
    });
  }
}
