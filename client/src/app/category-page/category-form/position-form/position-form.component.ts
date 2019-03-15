import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;

  constructor(
    private positionService: PositionService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      cost: [1, [Validators.required, Validators.min(1)]],
    });
    this.positionService.fetch(this.categoryId).subscribe(positions => {
      this.isLoading = false;
      this.positions = positions;
    });
  }

  ngAfterViewInit(): void {
    this.modalInstance = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modalInstance.destroy();
  }

  openModal(pos?: Position) {
    console.log(pos);
    this.modalInstance.open();
  }

  onCancel() {
    this.modalInstance.close();
  }

  onSubmit() {
    this.form.disable();

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    };

    this.positionService.create(newPosition).subscribe(
      position => {
        MaterialService.toast('Position Created');
        this.positions.push(position);
        this.form.reset({ name: null, cost: 1 });
        this.modalInstance.close();
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.form.enable();
      });
  }

  delete(pos: Position) {
    console.log(pos);
  }
}
