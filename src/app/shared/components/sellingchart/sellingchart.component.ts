import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
 interface ChartType {
  chart?: any;
  plotOptions?: any;
  colors?: any;
  series?: any;
  stroke?: any;
  labels?: any;
  legend?: any;
  type?: any;
  height?: any;
  dataLabels?: any;
}

@Component({
    selector: 'app-sellingchart',
    templateUrl: './sellingchart.component.html',
    imports: [CommonModule, NgApexchartsModule],
    styleUrls: ['./sellingchart.component.scss']
})
export class SellingchartComponent implements OnInit {

  @Input() Chartcolor;
  @Input() value;

  chartData: ChartType;

  constructor() { }

  ngOnInit(): void {
    this.chartData = {
      series: [this.value],
      chart: {
        type: 'radialBar',
        width: 60,
        height: 60,
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: [this.Chartcolor],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '60%'
          },
          track: {
            margin: 0
          },
          dataLabels: {
            show: false
          }
        }
      }
    };
  }
}
