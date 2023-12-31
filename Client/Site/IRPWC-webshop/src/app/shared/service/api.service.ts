import {HttpClient} from '@angular/common/http';
import {z} from 'zod';
import {Injectable} from '@angular/core';
import {map, Observable, tap} from 'rxjs';
import {Product} from "../../product.model";
import {AuthService} from "./auth.service";

const API_URL = 'http://localhost:8080/api/v1';


@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${API_URL}/product/create`, formData, {responseType: 'text', observe: 'response'});
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/product/all`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<Product>(`${API_URL}/product/${id}`).pipe(
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


    PostLogin(payload: { password: string; username: string }) {
      return this.http.post(`${API_URL}/auth/login`, payload).pipe(
        map((data) => {
          return z
            .object({
              payload: z.object({
                token: z.string(),
              }),
            })
            .parse(data);
        }),
        tap((data) => {
          this.authService.setToken(data.payload.token);
        })
      );
    }


  PostRegister(payload: { username: string; password: string }) {
    return this.http.post(`${API_URL}/user/register`, payload).pipe(
      map((data) => {
        return z
          .object({
            payload: z.object({
              token: z.string(),
            }),
          })
          .parse(data);
      }),
    );
  }
}


