import { Component } from '@angular/core';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CategoryListComponent, ProductListComponent, HttpClientModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Angular App';
}
