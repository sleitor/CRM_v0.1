import { AfterViewInit, Component, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { Filter } from '../../shared/interfaces';
import { MaterialDatePicker, MaterialService } from '../../shared/services/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {
  number: number;
  @ViewChild('start') startRef;
  start: MaterialDatePicker;
  @ViewChild('end') endRef;
  end: MaterialDatePicker;
  isValid: boolean = true;

  @Output() onSubmit = new EventEmitter<Filter>();

  constructor() { }

  ngAfterViewInit(): void {
    this.start = MaterialService.initDatePicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatePicker(this.endRef, this.validate.bind(this));
  }

  ngOnDestroy(): void {
    this.start.destroy();
    this.end.destroy();
  }

  applyFilter() {
    const filter: Filter = {
      number: this.number,
      start: this.start.date,
      end: this.end.date,
    };

    console.log(filter);
    this.onSubmit.emit(filter);
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }

    this.isValid = this.start.date <= this.end.date;
  }
}
