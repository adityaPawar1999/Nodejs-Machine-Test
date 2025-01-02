import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CategoryListComponent } from './category/category-list/category-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';

@NgModule({
  declarations: [],  // No need to declare AppComponent here if it's standalone
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CategoryListComponent,  // Import CategoryListComponent here
    ProductListComponent    // Import ProductListComponent here
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
