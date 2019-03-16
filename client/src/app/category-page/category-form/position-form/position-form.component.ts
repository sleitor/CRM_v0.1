import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Position } from '../../../shared/interfaces';
import { MaterialInstance, MaterialService } from '../../../shared/services/material.service';
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
  private modalInstance: MaterialInstance;
  form: FormGroup;
  positionId: string;

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

  openModalSelected(pos: Position) {
    this.positionId = pos._id;
    this.form.patchValue({
      name: pos.name,
      cost: pos.cost,
    });
    this.modalInstance.open();
    MaterialService.updateForm();
  }

  openModal() {
    this.positionId = null;
    this.form.reset({
      name: null,
      cost: 1,
    });
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

    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionService.update(newPosition).subscribe(
        position => {
          MaterialService.toast('Position updated');
          const idx = this.positions.findIndex(p => p._id === newPosition._id);
          this.positions[idx] = position;
          this.form.reset({ name: null, cost: 1 });
          this.modalInstance.close();
        },
        error => MaterialService.toast(error.error.message),
        () => this.form.enable());
    } else {
      this.positionService.create(newPosition).subscribe(
        position => {
          MaterialService.toast('Position created');
          this.positions.push(position);
          this.form.reset({ name: null, cost: 1 });
          this.modalInstance.close();
        },
        error => MaterialService.toast(error.error.message),
        () => this.form.enable());
    }

  }

  delete($event: Event, pos: Position) {
    $event.stopPropagation();

    const decision = window.confirm(`Do you really want remove positon ${pos.name}?`);
    if (decision) {
      this.positionService.delete(pos).subscribe(() => {
        MaterialService.toast('Position deleted');
        this.positions = this.positions.filter(p => p._id !== pos._id);
      });
    }
  }
}
