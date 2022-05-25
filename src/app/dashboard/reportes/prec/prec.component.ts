import { Component, OnInit, Input } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};
@Component({
  selector: 'app-prec',
  templateUrl: './prec.component.html',
  styleUrls: ['./prec.component.scss']
})
export class PrecComponent implements OnInit {

  @Input()  item!: any[];

  ngOnInit(): void {
    const dataInfo=this.item.map((station) => {
      return {
        name: station.station.nombre,
        data: station.data.map((info: any) => {
          return info.precipitacion??0;
        }),
      };
    })

    this.chartOptions = {
      series: dataInfo,
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },

      title: {
        text: "Precipitaciones",
        align: 'center',
        style: {
          fontSize:  '18px',
          fontWeight:  'bold',
          //color:  'rgba(255, 255, 255, 0.8)'
        },
      },
      labels: this.item[0].data.map((data:any)=>{return data.fecha}),
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }

  public chartOptions: Partial<ChartOptions> | any;

  constructor() {
    
  }
}
