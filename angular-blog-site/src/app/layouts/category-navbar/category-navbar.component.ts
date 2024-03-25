import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.css',
})
export class CategoryNavbarComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }
}
