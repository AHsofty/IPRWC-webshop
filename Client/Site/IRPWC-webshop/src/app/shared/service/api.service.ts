import {HttpClient, HttpHeaders} from '@angular/common/http';
import {z} from 'zod';
import {EventEmitter, Injectable} from '@angular/core';
import {map, Observable, tap} from 'rxjs';
import {Product} from "../../product.model";

@Injectable()
export class ApiService {
  apiUrl = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) { }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/product/create`, formData, {responseType: 'text', observe: 'response'});
  }


}


