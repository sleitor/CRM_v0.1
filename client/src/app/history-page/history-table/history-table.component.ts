import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../shared/interfaces';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent implements OnInit {

  @Input() orders: Order[];

  constructor() { }

  ngOnInit() {
  }

}
