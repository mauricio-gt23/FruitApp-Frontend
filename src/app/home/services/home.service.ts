import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from "../interfaces/cliente.interface";

@Injectable({
    providedIn: 'root'
  })
  export class HomeService {
  
    private baseUrl: string = "http://localhost:8080";

    constructor( private http: HttpClient ) { }

    login(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/users`);
    }

    registro( cliente: Cliente): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/clients`, cliente);
    }
  
  }