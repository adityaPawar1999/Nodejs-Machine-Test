import { Component } from '@angular/core';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Make this component standalone
  imports: [CategoryListComponent, ProductListComponent],  // Import other standalone components here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Angular App';
}
