import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {

  isRoot: boolean = this.router.url === '/order';
  destroy$ = new Subject;

  constructor(
    private router: Router,
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
  }

}
