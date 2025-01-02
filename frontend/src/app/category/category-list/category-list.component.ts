import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.categories = data.categories;
      this.totalItems = data.totalItems;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCategories();
  }
}
