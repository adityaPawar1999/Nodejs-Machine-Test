import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { AppComponent } from './app.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule  // Ensure HttpClientModule is added here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
