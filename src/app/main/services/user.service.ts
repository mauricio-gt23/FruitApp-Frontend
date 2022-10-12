import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class UserService {

    private baseUrl: string = "https://app-fruithost.herokuapp.com";

    constructor( private http: HttpClient ) { }

    // Users
    getAllUsers(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/users`);
    }

    // Clients
    getClientById(id: any): Observable<any> {{
        return this.http.get<any>(`${this.baseUrl}/clients/${id}`)
    }}

    // Admins
    getAdminById(id: any): Observable<any> {{
        return this.http.get<any>(`${this.baseUrl}/admins/${id}`)
    }}
  
}