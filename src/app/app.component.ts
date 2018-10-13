import { Component } from '@angular/core';
import { StockMarketService } from './stock-market.service';
import { PortfolioService } from './portfolio.service';
import MyStock from './models/MyStock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myStocks: Array<MyStock>;
  userName: string;
  funds: number;

  constructor(private portfolio: PortfolioService, private stockmarket: StockMarketService) { }

  ngOnInit() {
    this.getPortfolio();

    
    setInterval(() => {
      this.getPortfolio();
    }, 60000);
  }

  onSellOrBuyStock(newFunds) {
    this.getPortfolio();
  }

  private getPortfolio(): void {
    this.portfolio.portfolio().subscribe((portfolioData: any) => {
      this.myStocks = portfolioData.myStocks;
      this.userName = portfolioData.username;
      this.funds = portfolioData.funds;
    });
  }
}
