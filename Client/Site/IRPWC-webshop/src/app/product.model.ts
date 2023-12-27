import {SafeResourceUrl} from "@angular/platform-browser";

export class Product {
  constructor(
    public id: string,
    public productName: string,
    public buyPrice: number,
    public sellPrice: number,
    public quantity: number,
    public description: string,
    public image: string,
  ) {}
}
