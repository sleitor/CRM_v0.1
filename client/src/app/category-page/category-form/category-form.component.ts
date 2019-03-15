import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  @ViewChild('file') fileRef: ElementRef;
  file: File;
  imagePreview: string | ArrayBuffer;
  categoryId: string;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
    this.route.params.pipe(
      pluck('id'),
      switchMap((id: string) => {
        this.isNew = !id;
        this.categoryId = id;
        return id ? this.categoryService.getById(id) : of(null);
      }),
    ).subscribe(
      (category: Category) => {
        if (category) {
          this.form.patchValue({ name: category.name });
          this.imagePreview = category.imageSrc;
        }
        MaterialService.updateForm();
      },
      (error => MaterialService.toast(error.error.message)),
    );
  }

  onSubmit() {
    this.form.disable();
    let obs$;
    if (this.isNew) {
      obs$ = this.categoryService.create(this.form.value.name, this.file);
    } else {
      obs$ = this.categoryService.update(this.categoryId, this.form.value.name, this.file);
    }

    obs$.subscribe(
      () => {
        MaterialService.toast('Category saved');
        this.form.enable();
      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      },
    );
  }

  delete() {
    const decidion = window.confirm(`Do you really want delete category ${this.form.value.name}`);

    decidion && this.categoryService.delete(this.categoryId).subscribe(
      resp => MaterialService.toast(resp.message),
      error1 => MaterialService.toast(error1.error.message),
      () => this.router.navigate(['/category']),
    );
  }

  loadFile(event) {
    // or we can make it with view child
    // this.file = this.fileRef.nativeElement.files[0];
    this.file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.file);
  }

  selectFile() {
    this.fileRef.nativeElement.click();
  }
}
