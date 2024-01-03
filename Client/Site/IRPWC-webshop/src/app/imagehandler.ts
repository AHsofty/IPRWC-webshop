import { Injectable } from '@angular/core';
import {ProductV2} from "./productv2.model";
import {Image} from "./image.model";
import {ApiService} from "./shared/service/api.service";
import {forkJoin, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImagehandlerService {
  constructor(private apiService: ApiService) {}

  public handleMainImage(product: ProductV2): Observable<ProductV2> {
    return new Observable<ProductV2>(observer => {
      this.processProductImages(product).subscribe(() => {
        observer.next(product);
        observer.complete();
      });
    });
  }

  private processProductImages(product: ProductV2): Observable<any> {
    const imageObservables: Observable<any>[] = [];
    if (product.images && Array.isArray(product.images)) {
      for (let image of product.images) {
        imageObservables.push(this.processImage(image));
      }
    }
    return forkJoin(imageObservables);
  }

  private processImage(image: Image): Observable<any> {
    return new Observable<any>((observer) => {
      if (image.imageName == "main") {
        this.apiService.getImageById(image.id)
          .subscribe({
            next: (blob) => {
              this.handleImageResponse(blob, image).then(() => {
                observer.next();
                observer.complete();
              });
            }
          });
      } else {
        observer.next();
        observer.complete();
      }
    });
  }

  private handleImageResponse(blob: Blob, image: Image): Promise<void> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        let base64data = reader.result;
        image.imageBase64 = base64data as string;
        resolve();
      }
      reader.onerror = reject;
    });
  }
}
