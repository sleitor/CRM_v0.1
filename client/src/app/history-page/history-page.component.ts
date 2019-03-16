import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/services/material.service';
import { OrderService } from '../shared/services/order.service';

const COUNT = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  oSup: Subscription;

  isFilterShow = false;
  orders = [];
  limit = COUNT;
  offset = 0;

  constructor(
    private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.fetch();
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy(): void {
    this.tooltip.destroy();
    this.oSup.unsubscribe();
  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit,
    };

    this.oSup = this.orderService.fetch(params).subscribe(
      orders => this.orders = orders,
    );
  }
}
