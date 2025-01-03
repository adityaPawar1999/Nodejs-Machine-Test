import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,  // Mark as standalone
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }
}
