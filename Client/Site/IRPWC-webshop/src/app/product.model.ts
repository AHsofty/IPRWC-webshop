import {Image} from "./image.model";

export class Product {
  constructor(
    public id: string,
    public productName: string,
    public buyPrice: number,
    public sellPrice: number,
    public quantity: number,
    public description: string,
    public images: Image[],

    public mainImageIndex?: number
  ) {}
}
