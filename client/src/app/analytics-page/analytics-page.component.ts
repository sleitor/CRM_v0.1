import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements OnInit, AfterViewInit {

  pending = true;
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;
  average: number;

  constructor(
    private analyticsService: AnalyticsService,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.analyticsService.getAnalytics().subscribe(data => {
      console.log(data);
      this.average = data.average;
      this.pending = false;
    });
  }

}
