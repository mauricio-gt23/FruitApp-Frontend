import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from "../interfaces/sale.interface";
import { SaleDetail } from "../interfaces/sale-detail.interface";

@Injectable({
    providedIn: 'root'
  })
export class SaleService {

    private baseUrl: string = "https://app-fruitback.herokuapp.com";

    constructor( private http: HttpClient ) { }

    // Sale
    postSale( sale: Sale ): Observable<any> {
        return this.http.post(`${this.baseUrl}/sales`, sale);
    }
    
    // SaleDetail
    getSaleDetail(): void {
        
    }

    postSaleDetail( saleId: any, saleDetail: SaleDetail): Observable<any> {
        return this.http.post(`${this.baseUrl}/sales/${saleId}/details`, saleDetail);
    }

}