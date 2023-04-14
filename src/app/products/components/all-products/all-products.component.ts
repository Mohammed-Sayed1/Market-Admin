import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    return this.service.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  getCategories() {
    return this.service.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  filterCategory(event: any) {
    let value = event.target.value;
    value == 'all' ? this.getProducts() : this.getProductsCategory(value);
  }
  getProductsCategory(keyword: string) {
    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      this.products = res;
    });
  }
}
