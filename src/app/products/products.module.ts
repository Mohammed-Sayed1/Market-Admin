import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsDetailsComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
  ],
  // exports: [AllProductsComponent],
})
export class ProductsModule {}
