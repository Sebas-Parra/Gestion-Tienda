import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
// Esto representa una categoría recibida del backend
export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
}

// Esto representa lo que se envía al backend para crear una categoría
export interface CategoryInput {
  name: string;
  description: string;
}


@Injectable({
  providedIn: 'root'
})
export class CategorieSService {
  //private apiUrl = 'http://localhost:8082/api/categories';
  private apiUrl = environment.categoriesApi;

  constructor(private http:HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Category>(url);
  }

  createCategory(category: CategoryInput): Observable<Category> {
  return this.http.post<Category>(this.apiUrl, category);
}


  updateCategory(id: number, category: Category): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Category>(url, category);
  }

  deleteCategory(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }


}
