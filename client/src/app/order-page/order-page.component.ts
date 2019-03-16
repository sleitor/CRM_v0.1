import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MaterialModalInstance, MaterialService } from '../shared/services/material.service';
import { OrderPageService } from './order-page.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderPageService],
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialModalInstance;
  isRoot: boolean = this.router.url === '/order';
  destroy$ = new Subject;


  constructor(
    private router: Router,
    private orderPageService: OrderPageService,
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
    this.modal.close();
  }
}
