import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

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
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
    this.route.params.subscribe((params: Params) => {
      this.isNew = !params.id;
    });
  }

  onSubmit() {
    console.log('1');
  }
}
