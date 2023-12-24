import {HttpClient, HttpHeaders} from '@angular/common/http';
import {z} from 'zod';
import {EventEmitter, Injectable} from '@angular/core';
import {map, Observable, tap} from 'rxjs';
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


}


