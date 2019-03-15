import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Position } from '../../../shared/interfaces';
import { MaterialModalInstance, MaterialService } from '../../../shared/services/material.service';
import { PositionService } from '../../../shared/services/position.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;
  positions: Position[];
  isLoading = true;
  private modalInstance: MaterialModalInstance;

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

  ngAfterViewInit(): void {
    this.modalInstance = MaterialService.initModal(this.modalRef);
  }


  openModal(pos: Position) {
    console.log(pos);
    this.modalInstance.open();
  }

  onCancel() {
    this.modalInstance.close();
  }

  ngOnDestroy(): void {
    this.modalInstance.destroy();
  }
}
