import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Make sure HttpClient is imported
import { Observable } from 'rxjs';
import { Category } from '../shared/models/category.model';

@Injectable({
  providedIn: 'root'  // Ensure the service is provided globally
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/categories'; // Update with your backend API URL

  constructor(private http: HttpClient) { } // Inject HttpClient

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  // Add more methods like update, delete as needed
}
