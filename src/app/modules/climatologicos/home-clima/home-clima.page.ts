import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import * as mapboxgl from 'mapbox-gl';

import * as Highcharts from 'highcharts';
import { Chart } from 'highcharts';
import { CalendarificService } from 'src/app/services/calendarific.service';
import { LunarService } from 'src/app/services/lunar.service';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-home-clima',
  templateUrl: './home-clima.page.html',
  styleUrls: ['./home-clima.page.scss'],
})
export class HomeClimaPage implements OnInit {

  lunarPhases: any[] = [];


  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};


  private map!: mapboxgl.Map;

  forecast: any[] = [];
  currentWeather: any;

  hourlyForecast: any[] = [];

  constructor(
    private weatherService: WeatherService,
    private calendarificService: CalendarificService,
    private lunarService: LunarService
  ) { }

  async ngOnInit() {

    try {
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      this.getWeatherForecast(lat, lon);
      this.getCurrentWeather(lat, lon);
      this.getWeatherForecastChart(lat, lon);
    } catch (err) {
      console.error('Error getting location', err);
    }

    // const lat = 6.5187635;
    // const lon = -74.105555;
    // this.getWeatherForecast(6.5187635, -74.105555);
    // this.getCurrentWeather(6.5187635, -74.105555);
    // this.getWeatherForecastChart(6.5187635, -74.105555);
    // this.initializeMap();
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    this.createCalendarToShowExample(year, month);
    this.loadLunarPhases(month, year);

  }

  ionViewDidEnter() {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

  // getWeatherForecast(lat: number, lon: number) {
  //   this.weatherService.getWeatherForecast(lat, lon).subscribe((data: any) => {
  //     this.forecast = data.list;
  //   });
  // }

  getWeatherForecast(lat: number, lon: number) {
    this.weatherService.getWeatherForecast(lat, lon).subscribe((data: any) => {
      // Accediendo al array "hour" del primer día de la previsión.
      this.hourlyForecast = data.forecast.forecastday[0].hour;
      console.log(this.hourlyForecast); // Para verificar los datos en la consola.
    });
  }

  // getCurrentWeather(lat: number, lon: number) {
  //   this.weatherService.getCurrentWeather(lat, lon).subscribe((data: any) => {
  //     this.currentWeather = data;
  //   });
  // }
  getCurrentWeather(lat: number, lon: number) {
    this.weatherService.getWeatherForecast(lat, lon).subscribe((data: any) => {
      // Accediendo al array "hour" del primer día de la previsión.
      this.currentWeather = data;
      // console.log(this.hourlyForecast); // Para verificar los datos en la consola.
    });
  }

  loadLunarPhases(month: number, year: number): void {
    this.lunarService.getLunarPhases(month, year).subscribe((data: any) => {
      this.lunarPhases = data.phase;
      this.markMoonPhases();
    });
  }

  markMoonPhases(): void {
    const CSS_selector_identifier = ".contains_day_number"; // Seleccionador CSS que identifica las cajas que contienen el número de día en tu calendario.
    document.querySelectorAll(CSS_selector_identifier).forEach((box, i) => {
      if (this.lunarPhases[i + 1]?.isPhaseLimit) {
        const url = "data:image/svg+xml;utf8," + encodeURIComponent(this.lunarPhases[i + 1].svgMini);
        (box as HTMLElement).style.backgroundImage = `url("${url}")`;
        (box as HTMLElement).style.backgroundSize = "25%";
        (box as HTMLElement).style.backgroundRepeat = "no-repeat";
        (box as HTMLElement).style.backgroundPosition = "5px 5px";
      }
    });
  }

  createCalendarToShowExample(year: number, month: number): void {
    let week, box, td;
    const table = document.createElement("table");
    table.setAttribute("style", "width:100% ;max-width:700px ;margin:20px auto; font-size:30px; border-collapse:collapse; font-family:sans-serif");
    const first_day_week_sunday = false;
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.setAttribute("colspan", "7");
    th.innerHTML = (month + 1) + "/" + year;
    table.appendChild(tr);
    tr.appendChild(th);
    const empty_initial_boxes = new Date(year, month - 1, 1).getDay() - (first_day_week_sunday ? 0 : 1);
    const number_days_month = new Date(year, month, 0).getDate();
    const number_weeks_month = Math.ceil((empty_initial_boxes + number_days_month) / 7);
    let index = 0;
    let number_day = 0;
    for (let week = 0; week < number_weeks_month; week++) {
      tr = document.createElement("tr");
      for (let box = 0; box < 7; box++) {
        td = document.createElement("td");
        td.setAttribute("style", "border:1px solid black; width:calc(100% / 7); padding:15px 5px 5px 0px; text-align:right");
        if (index >= empty_initial_boxes) {
          number_day++;
          if (number_day <= number_days_month) {
            td.innerHTML = number_day.toString();
            td.className = "contains_day_number";
            td.style.backgroundColor = "darkgray";
            if ((new Date).getDate() === number_day) td.style.boxShadow = "inset 0 0 0 2px white";
            if (new Date(year, month - 1, number_day).getDay() === 0) {
              td.style.backgroundColor = "gray";
              td.style.color = "white";
            }
          }
        }
        index++;
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    document.getElementById("ex4")!.appendChild(table);
  }

  getWeatherForecastChart(lat: number, lon: number){
    this.weatherService.getWeatherForecast(lat, lon).subscribe((data: any) => {
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
            if (this.points) {
              this.points.forEach(point => {
                tooltip += `${point.series.name}: ${point.y}°<br/>`;
              });
            }
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

      // Redibuja el gráfico para asegurarse de que se renderiza correctamente
      Highcharts.chart('chartContainer', this.chartOptions);
    });

  }

  getWindDirection(deg: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5);
    return directions[index % 16];
  }

  private initializeMap(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZXNuZWlkZXIxMiIsImEiOiJjbGFhOXFvb24wMndyM3ZudXoxbmt0NGhmIn0.WqpXIfgTCT4mgjWf2RIkTg';
    this.map = new mapboxgl.Map({
      container: 'maptemp',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.57559150916143, 6.77253269951224],
      zoom: 7
    });

    this.map.on('load', () => {
      this.map.addLayer({
        id: 'openweather',
        type: 'raster',
        source: {
          type: 'raster',
          tiles: [
            'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=e10c846612ece0112a5b9a3431e8356d'
          ],
          tileSize: 256
        },
        layout: {
          'visibility': 'visible'
        }
      });
    });
  }

}
