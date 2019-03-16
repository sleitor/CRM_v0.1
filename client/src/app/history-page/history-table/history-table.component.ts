import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Order } from '../../shared/interfaces';
import { MaterialInstance, MaterialService } from '../../shared/services/material.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
})
export class HistoryTableComponent implements OnDestroy, AfterViewInit {

  @Input() orders: Order[];
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;

  selectedOrder: Order;

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  computeOrder(order: Order) {
    return order.list.reduce((total, item) => total + item.cost * item.quantity, 0);
  }

  openModal(order: Order) {
    this.selectedOrder = order;
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }
}
