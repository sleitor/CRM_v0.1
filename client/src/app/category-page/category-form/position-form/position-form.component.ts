import { Component, Input, OnInit } from '@angular/core';
import { Position } from '../../../shared/interfaces';
import { PositionService } from '../../../shared/services/position.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit {

  @Input() categoryId: string;
  positions: Position[];
  isLoading = true;

  constructor(
    private positionService: PositionService,
  ) {
  }

  ngOnInit() {
    this.positionService.fetch(this.categoryId).subscribe(positions => {
      this.isLoading = false;
      this.positions = positions;
    });
  }



}
