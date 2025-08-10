import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Product{
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosSService {
  //private apiUrl = 'http://localhost:8081/api/products';

  private apiUrl = environment.productsApi;
  
  constructor( private http:HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }


  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  createProduct(product: ProductInput): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Product>(url, product);
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
