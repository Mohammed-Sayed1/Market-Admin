import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { CartProduct } from 'src/app/shared/models/cart-product';
import { Model } from 'src/app/shared/models/model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  total: number = 0;
  success: boolean = false;
  constructor(private service: CartsService) {}

  ngOnInit(): void {
    this.getCartPorducts();
  }

  getCartPorducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getCartTotal();
  }

  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  minsAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  detectChange() {
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  clearCart() {
    this.cartProducts = [];
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  getCartTotal() {
    this.total = 0;
    for (let i in this.cartProducts) {
      this.total +=
        +this.cartProducts[i].item.price * this.cartProducts[i].quantity;
    }
  }

  addCart() {
    let porducts = this.cartProducts.map((item) => {
      return { productId: item.item.id, quantity: item.quantity };
    });
    let Model: Model = {
      userId: 5,
      date: new Date(),
      products: porducts,
    };

    this.service.createNewCart(Model).subscribe((res) => {
      this.success = true;
    });
  }
}
