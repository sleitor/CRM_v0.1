import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Position } from '../../shared/interfaces';
import { PositionService } from '../../shared/services/position.service';
import { OrderPageService } from '../order-page.service';

@Component({
  selector: 'app-positons',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.scss']
})
export class PositionsPageComponent implements OnInit {

  positions$: Observable<Position[]>;

  constructor(
    private positionService: PositionService,
    private route: ActivatedRoute,
    private orderPageService: OrderPageService,
  ) {
  }

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => this.positionService.fetch(params.id)),
      map(positions => {
        positions.forEach(p => p.quantity = 1);
        return positions;
      }),
    );
  }

  addToOrder(position: Position) {
    this.orderPageService.add(position);
  }
}
