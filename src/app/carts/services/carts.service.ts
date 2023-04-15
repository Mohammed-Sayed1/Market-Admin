import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from 'src/app/shared/models/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(private http: HttpClient) {}

  createNewCart(model: Model): Observable<{}> {
    return this.http.post(`${environment.baseApi}carts`, model);
  }
}
