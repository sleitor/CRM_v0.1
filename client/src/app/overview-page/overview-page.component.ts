import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewData } from '../shared/interfaces';
import { AnalyticsService } from '../shared/services/analytics.service';
import { MaterialInstance, MaterialService } from '../shared/services/material.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tapTarget') tapTargetRef: ElementRef;
  tapTarget: MaterialInstance;

  data$: Observable<OverviewData>;

  constructor(
    private analyticsService: AnalyticsService,
  ) {
  }

  ngOnInit() {
    this.data$ = this.analyticsService.getOverview();
  }

  openTap() {
    this.tapTarget.open();
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy();
  }
}
