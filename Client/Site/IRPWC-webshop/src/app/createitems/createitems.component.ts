import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ApiService} from "../shared/service/api.service";

@Component({
  selector: 'app-createitems',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createitems.component.html',
  styleUrl: './createitems.component.scss'
})
export class CreateitemsComponent {
  @Input() public productName: string | undefined = undefined;
  @Input() public buyPrice: number | undefined= undefined
  @Input() public sellPrice: number | undefined= undefined
  @Input() public quantity: number | undefined= undefined
  @Input() public description: string | undefined= undefined;
  @Input() public image: string | undefined= undefined;

  @ViewChild('docpicker') docpicker!: ElementRef;
  constructor(private toastr: ToastrService, private apiService: ApiService) {
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

    this.apiService.addProduct(formData).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.toastr.success('Product added', 'Success');
        }
        else {
          this.toastr.error('An unkown error occured whilst trying to create a post', 'Error');
        }
      }
    });
  }

}
