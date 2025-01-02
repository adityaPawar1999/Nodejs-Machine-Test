import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../shared/models/product.model';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  newProduct: { name: string, categoryId: number } = { name: '', categoryId: 0 };
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.products = data.products;
      this.totalPages = Math.ceil(data.total / this.pageSize);
    });
  }

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.categoryId) {
      this.productService.addProduct(this.newProduct).subscribe(() => {
        this.newProduct = { name: '', categoryId: 0 };
        this.loadProducts();
      });
    }
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
    });
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }
}
