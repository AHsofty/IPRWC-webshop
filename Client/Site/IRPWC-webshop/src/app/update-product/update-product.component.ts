import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService} from "../shared/service/api.service";
import {Product} from "../product.model";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  public product: Product | undefined = undefined;
  private id: string = "";
  private routeSub: Subscription = new Subscription();

  @Input() public productName: string | undefined = undefined;
  @Input() public buyPrice: number | undefined= undefined
  @Input() public sellPrice: number | undefined= undefined
  @Input() public quantity: number | undefined= undefined
  @Input() public description: string | undefined= undefined;
  @Input() public image: string | undefined= undefined;
  @ViewChild('docpicker') docpicker!: ElementRef;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id']; // Save the UUID from the URL
    });
    this.apiService.getProductById(this.id).subscribe(product => {
      this.product = product;

      this.productName = product.productName;
      this.buyPrice = product.buyPrice;
      this.sellPrice = product.sellPrice;
      this.quantity = product.quantity;
      this.description = product.description;
    });
  }


  onSubmitClick() {
    if (
      this.productName === undefined
      || this.buyPrice === undefined
      || this.sellPrice === undefined
      || this.quantity === undefined
      || this.description === undefined
      || this.image === undefined) {
      this.toastr.error("Please fill in all fields", "Failed to create product", {timeOut : 2500})
      return
    }

    const product = {
      id: this.id,
      productName: this.productName,
      buyPrice: this.buyPrice,
      sellPrice: this.sellPrice,
      quantity: this.quantity,
      description: this.description,
    }

    const formData = new FormData();
    const fileInput = this.docpicker.nativeElement;
    const file = fileInput.files[0];
    if (file && file instanceof Blob) {
      formData.append('image', file, 'image.jpg');
    }
    else {
      console.log('No file selected');
    }

    formData.append('product', JSON.stringify(product));

    this.apiService.editProduct(formData).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.toastr.success('Product added', 'Success');
          console.log("Succes!");
        }
        else {
          this.toastr.error('An unkown error occured whilst trying to create a post', 'Error');
        }
      }
    });
  }
}
