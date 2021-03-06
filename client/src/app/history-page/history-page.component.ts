import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Filter } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/services/material.service';
import { OrderService } from '../shared/services/order.service';

const COUNT = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  oSup: Subscription;

  isFilterShow = false;
  orders = [];
  limit = COUNT;
  skip = 0;

  reloading = true;
  loading = false;
  noMoreLoad = false;

  filter: Filter = {};

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

  loadMore() {
    this.loading = true;
    this.skip += COUNT;
    this.fetch();
  }

  takeFilter(filter: Filter) {
    console.log('sdfg');
    this.filter = filter;
    this.skip = 0;
    this.orders = [];
    this.reloading = true;
    this.fetch();
  }

  isFiltered(): boolean {
    return !!Object.keys(this.filter).length;
  }

  private fetch() {
    const params = Object.assign({ skip: this.skip, limit: this.limit }, this.filter);

    this.oSup = this.orderService.fetch(params).subscribe(
      orders => {
        this.orders = this.orders.concat(orders);
        this.loading = false;
        this.reloading = false;
        this.noMoreLoad = orders.length < COUNT;
      },
    );
  }
}
