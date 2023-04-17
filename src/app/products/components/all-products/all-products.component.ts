import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../shared/models/product';
import { CartProduct } from '../../../shared/models/cart-product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  base64: any = '';
  form!: FormGroup;
  constructor(private service: ProductsService, private build: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.build.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true;
    return this.service.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
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

  getSelectedCategory(event: any) {
    this.form.get('category')?.setValue(event.target.value);
  }

  getImagePath(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.form.get('image')?.setValue('this text instaed of base64');
    };
  }

  addProduct() {
    const model = this.form.value;
    this.service.createProduct(model).subscribe((res) => {
      alert('Product Added Successfully');
    });
  }

  update(item: any) {
    this.form.patchValue({
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
    });
    this.base64 = item.image;
  }
}
