import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // User APIs
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }
  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  // Other APIs for meals and expenses can be added similarly
}
