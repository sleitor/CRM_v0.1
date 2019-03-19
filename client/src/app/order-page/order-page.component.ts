import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order, OrderPosition } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/services/material.service';
import { OrderService } from '../shared/services/order.service';
import { OrderPageService } from './order-page.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderPageService],
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  isRoot: boolean = this.router.url === '/order';
  destroy$ = new Subject;
  processing = false;


  constructor(
    private router: Router,
    public orderPageService: OrderPageService,
    private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.router.events.pipe(
      takeUntil(this.destroy$),
    )
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          console.log(this.router.url, this.router.url === '/order');
          this.isRoot = this.router.url === '/order';
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.modal.destroy();
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }


  openModal() {
    this.modal.open();
  }

  onCancel() {
    this.modal.close();
  }

  onSubmit() {
    this.processing = true;
    const order: Order = {
      list: this.orderPageService.list.map(l => {
        delete l._id;
        return l;
      }),
    };

    this.orderService.create(order).subscribe(
      savedOrder => {
        MaterialService.toast(`Order #${savedOrder.order} saved`);
        this.modal.close();
        this.orderPageService.clear();
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.processing = false;
      },
    );
  }

  onDeletePosition(item: OrderPosition) {
    this.orderPageService.remove(item)
  }
}
