import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.scss'],
})
export class TemperatureChartComponent  implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  @Input() lat!: number;
  @Input() lon!: number;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeatherForecast(this.lat, this.lon).subscribe((data) => {
      const categories = data.list.map((item: any) => item.dt_txt);
      const tempMaxData = data.list.map((item: any) => item.main.temp_max);
      const tempMinData = data.list.map((item: any) => item.main.temp_min);

      this.chartOptions = {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Temperaturas Máximas y Mínimas'
        },
        xAxis: {
          categories: categories,
          tickInterval: 8
        },
        yAxis: {
          title: {
            text: 'Temperatura (°C)'
          },
          labels: {
            format: '{value}°'
          }
        },
        tooltip: {
          shared: true,
          useHTML: true,
          formatter: function () {
            let tooltip = `<b>${this.x}</b><br/>`;
            this.points!.forEach(point => {
              tooltip += `${point.series.name}: ${point.y}°<br/>`;
            });
            return tooltip;
          }
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
            }
          }
        },
        series: [
          {
            name: 'Temperatura Máxima',
            type: 'spline',
            data: tempMaxData,
            marker: {
              symbol: 'circle'
            }
          },
          {
            name: 'Temperatura Mínima',
            type: 'spline',
            data: tempMinData,
            marker: {
              symbol: 'circle'
            }
          }
        ]
      };
    });
  }

}
