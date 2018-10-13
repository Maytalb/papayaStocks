import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { MyPortfolioComponent } from './my-portfolio/my-portfolio.component';
import { ResultsComponent } from './results/results.component';
import { HttpClientModule } from '@angular/common/http';
import { StockFilterPipe } from './stock-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MyPortfolioComponent,
    ResultsComponent,
    StockFilterPipe
  ],
  imports: [   
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
