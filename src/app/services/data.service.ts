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
  // Fetch all meals
  getMeals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/meals`);
  }

  // Add a new meal
  addMeal(meal: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/meals`, meal);
  }

  // Update an existing meal
  updateMeal(id: number, meal: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/meals/${id}`, meal);
  }

  // Delete a meal
  deleteMeal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/meals/${id}`);
  }

  // Get Expenses
  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/expenses`);
  }  
  // Add Expense
  addExpense(expense: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/expenses`, expense);
  }

  // Delete Expense
  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/expenses/${id}`);
  }

}
