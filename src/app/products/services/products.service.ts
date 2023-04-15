import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<{}> {
    return this.http.get(`${environment.baseApi}products`);
  }

  getAllCategories(): Observable<{}> {
    return this.http.get(`${environment.baseApi}products/categories`);
  }

  getProductsByCategory(keyword: string): Observable<{}> {
    return this.http.get(`${environment.baseApi}products/category/${keyword}`);
  }

  getProductById(id: any): Observable<{}> {
    return this.http.get(`${environment.baseApi}products/${id}`);
  }
}
