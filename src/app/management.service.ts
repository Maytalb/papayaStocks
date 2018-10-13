import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private http: HttpClient) { }

  reset() {
    return this.http.delete('http://18.224.25.44/stock-exchange-service/management');
  }

  refresh() {
    return this.http.get('http://18.224.25.44/stock-exchange-service/management/refresh', {
      headers: {
        "Accept": "*/*"
      }
    });
  }
}
