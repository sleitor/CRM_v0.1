import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../shared/interfaces';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.fetch();
  }

}
