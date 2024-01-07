import { Injectable } from '@angular/core';
import {Product} from "../../product.model";
import {Image} from "../../image.model";
import {ApiService} from "./api.service";
import {forkJoin, map, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImagehandlerService {
  constructor() {}


  public handleMainImage(product: Product): Observable<Product> {
    if (!product.images || !Array.isArray(product.images)) {
      return of(product);
    }

    const imageObservables: Observable<any>[] = [];
    for (let image of product.images) {
      imageObservables.push(this.processImage(image));
    }

    return forkJoin(imageObservables).pipe(
      map(() => product)
    );
  }

  private processImage(image: Image): Observable<any> {
    if (image.imageName === "main") {
      image.imageUrl = ApiService.API_URL + `/image/${image.id}`;
      return of(image);
    }
    return of(null);
  }

}
