import {HttpClient} from '@angular/common/http';
import {z} from 'zod';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Product} from "../../product.model";

@Injectable()
export class ApiService {
  API_URL = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) { }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/product/create`, formData, {responseType: 'text', observe: 'response'});
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/product/all`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<Product>(`${this.API_URL}/product/${id}`).pipe(
      map(data => {
        if (data === null || data === undefined) {
          throw new Error('Product not found');
        }
        return z.object({
          id: z.string(),
          productName: z.string(),
          buyPrice: z.number(),
          sellPrice: z.number(),
          quantity: z.number(),
          description: z.string(),
          image: z.string(),
        }).parse(data);
      })
    );
  }


}


