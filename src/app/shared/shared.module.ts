import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AllProductsComponent } from '../products/components/all-products/all-products.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent],
  // declarations: [HeaderComponent, AllProductsComponent],
  imports: [CommonModule, BrowserModule, RouterModule],
  exports: [HeaderComponent, SpinnerComponent],
})
export class SharedModule {}
