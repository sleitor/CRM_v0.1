import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewData } from '../shared/interfaces';
import { AnalyticsService } from '../shared/services/analytics.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  data$: Observable<OverviewData>;

  constructor(
    private analyticsService: AnalyticsService,
  ) {
  }

  ngOnInit() {
    this.data$ = this.analyticsService.getOverview();
  }

}
