export class Product {
  constructor(
    public productName: string,
    public buyPrice: number,
    public sellPrice: number,
    public quantity: number,
    public description: string,
    public image: string
  ) {}
}
