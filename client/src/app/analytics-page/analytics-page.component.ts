import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
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
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255,99,132)',
    };

    const orderConfig: any = {
      label: 'Orders',
      color: 'rgb(54,162,235)',
    };


    this.analyticsService.getAnalytics().subscribe(data => {
      this.average = data.average;
      this.pending = false;

      gainConfig.labels = data.chart.map(item => item.label);
      gainConfig.data = data.chart.map(item => item.gain);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';
      new Chart(gainCtx, createChartConfig(gainConfig));

      orderConfig.labels = gainConfig.labels;
      orderConfig.data = data.chart.map(item => item.order);

      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      orderCtx.canvas.height = '300px';
      new Chart(orderCtx, createChartConfig(orderConfig));

    });
  }

}

function createChartConfig({ labels, data, label, color }) {
  return {
    type: 'line',
    options: {
      responsive: true,
    },
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderColor:
        color,
        steppedLine: false,
        fill: false,
      }],
    },
  };
}
