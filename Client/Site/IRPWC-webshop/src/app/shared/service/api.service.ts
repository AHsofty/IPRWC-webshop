import {HttpClient, HttpHeaders} from '@angular/common/http';
import {z} from 'zod';
import {Injectable} from '@angular/core';
import {map, Observable, tap} from 'rxjs';
import {AuthService} from "./auth.service";
import {Product} from "../../product.model";



@Injectable()
export class ApiService {
  // public static API_URL = 'https://erenbasaran.nl:8080/api/v1';
  public static API_URL = 'http://localhost:8080/api/v1';


  constructor(private http: HttpClient, private authService: AuthService) { }

  addProduct(formData: FormData): Observable<any> {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${(ApiService.API_URL)}/product/create`, formData, {responseType: 'text', observe: 'response', headers: headers});
  }

  editProduct(formData: FormData): Observable<any> {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${ApiService.API_URL}/product/update`, formData, {responseType: 'text', observe: 'response', headers: headers});
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ApiService.API_URL}/product/all`);
  }


  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${ApiService.API_URL}/product/${id}`)
  }

  PostLogin(payload: { password: string; username: string }) {
    return this.http.post(`${ApiService.API_URL}/auth/login`, payload).pipe(
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
    return this.http.post(`${ApiService.API_URL}/user/register`, payload).pipe(
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

  deleteProductById(id: string): Observable<any> {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${ApiService.API_URL}/product/delete/${id}`, {responseType: 'text', observe: 'response', headers: headers});
  }
}


