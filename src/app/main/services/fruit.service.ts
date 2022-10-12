import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class FruitService {

    private baseUrl: string = "https://app-fruithost.herokuapp.com";

    constructor( private http: HttpClient ) { }

    getAllFruit(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/fruits`);
    }

    getByName(name: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/fruits`, { params: new HttpParams().set('name', name)} )
    }  
}