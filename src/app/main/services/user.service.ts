import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class UserService {

    private baseUrl: string = environment.HOST_API;

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