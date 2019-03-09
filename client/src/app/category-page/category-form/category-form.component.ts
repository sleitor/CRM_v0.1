import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  isNew = true;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.isNew = !params.id;
    });
  }

}
