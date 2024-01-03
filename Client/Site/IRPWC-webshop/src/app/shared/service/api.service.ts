import {HttpClient, HttpHeaders} from '@angular/common/http';
import {z} from 'zod';
import {Injectable} from '@angular/core';
import {map, Observable, tap} from 'rxjs';
import {Product} from "../../product.model";
import {AuthService} from "./auth.service";
import {ProductV2} from "../../productv2.model";

const API_URL = 'http://localhost:8080/api/v1';
const API_URL_v2 = 'http://localhost:8080/api/v2';


@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  addProduct(formData: FormData): Observable<any> {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${API_URL_v2}/product/create`, formData, {responseType: 'text', observe: 'response', headers: headers});
  }


  getAllProductsV2(): Observable<ProductV2[]> {
    return this.http.get<ProductV2[]>(`${API_URL_v2}/product/all`);
  }

  getImageById(id: String): Observable<Blob> {
    return this.http.get(`${API_URL_v2}/image/${id}`, {responseType: 'blob'});
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

  getProductByIdV2(id: string): Observable<ProductV2> {
    return this.http.get<ProductV2>(`${API_URL_v2}/product/${id}`)
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


