import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { CartProduct } from 'src/app/shared/models/cart-product';
import { Model } from 'src/app/shared/models/model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carts: any[] = [];
  products: any[] = [];
  total = 0;
  form!: FormGroup;
  details: any;
  constructor(
    private service: CartsService,
    private build: FormBuilder,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.form = this.build.group({
      start: [''],
      end: [''],
    });
    this.getAllCarts();
  }

  getAllCarts() {
    this.service.getAllCarts().subscribe((res: any) => {
      this.carts = res;
    });
  }

  applyFilter() {
    let date = this.form.value;
    this.service.getAllCarts(date).subscribe((res: any) => {
      this.carts = res;
    });
  }

  deleteCart(id: number) {
    this.service.deleteCart(id).subscribe((res) => {
      this.getAllCarts();
      alert('Cart Deleted successfully');
    });
  }

  view(index: number) {
    this.products = [];
    this.total = 0;
    this.details = this.carts[index];
    for (let i in this.details.products) {
      this.productService
        .getProductById(this.details.products[i].productId)
        .subscribe((res) => {
          this.products.push({
            item: res,
            quantity: this.details.products[i].quantity,
          });
          this.total +=
            this.products[+i].item.price * this.products[+i].quantity;
        });
    }
  }
}
