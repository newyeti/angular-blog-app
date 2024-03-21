import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  categories: Category[] = [];
  formCategory?: string;
  categoryId: string = '';
  formStatus = 'Add';

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe((values) => {
      this.categories = values;
    });
  }

  onSubmit(formData: NgForm) {
    let categoryData: Category = {
      category: formData.value.category,
      id: this.categoryId,
    };

    if (this.formStatus === 'Add') {
      this.categoriesService.saveData(categoryData);
    } else if (this.formStatus === 'Edit') {
      this.categoriesService.updateData(categoryData.id, categoryData.category);
      this.formStatus = 'Add';
    }

    formData.reset();
  }

  onEdit(category: string, id: string) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: string) {
    this.categoriesService.deleteData(id);
  }
}
