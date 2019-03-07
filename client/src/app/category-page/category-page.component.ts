import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/interfaces';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {

  categories: Category[] = [];
  loading = false;

  constructor(
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.categoryService.fetch().subscribe(categories => {
      this.loading = false;
      this.categories = categories;
    });
  }

}
