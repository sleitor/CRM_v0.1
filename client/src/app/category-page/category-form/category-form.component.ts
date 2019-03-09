import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';
import { Category } from '../../shared/interfaces';
import { CategoryService } from '../../shared/services/category.service';
import { MaterialService } from '../../shared/services/material.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  isNew = true;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
    this.route.params.pipe(
      pluck('id'),
      switchMap((id) => {
        this.isNew = !id;
        return id ? this.categoryService.getById(id) : of(null);
      }),
    ).subscribe(
      (category: Category) => {
        if (category) this.form.patchValue({ name: category.name });
        MaterialService.updateForm();
      },
      (error => MaterialService.toast(error.error.message)),
    );
  }

  onSubmit() {
    console.log('1');
  }
}
