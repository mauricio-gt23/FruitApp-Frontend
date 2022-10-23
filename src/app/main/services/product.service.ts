import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ProductService {

    private baseUrl: string = "https://app-fruitback.herokuapp.com";

    constructor( private http: HttpClient ) { }

    // Product
    getByIdProduct(id: any) : Observable<any>{
        return this.http.get<any>(`${this.baseUrl}/products/${id}`);
    }

    // Fruit
    getAllFruit(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/fruits`);
    }

    getByNameFruit(name: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/fruits`, { params: new HttpParams().set('name', name)} )
    }

    // Juice
    getAllJuice(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/juices`);
    }


    getByNameJuice(name: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/juices`, { params: new HttpParams().set('name', name)} )
    }
}