import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { WeatherService } from '../services/weather.service';
import { Geolocation } from '@capacitor/geolocation';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  appName: string = environment.appName;

  weatherData: any;
  currentDate: string;

  forecast: any[] = [];
  currentWeather: any;


  constructor(
    private navCtrl: NavController,
    private weatherService: WeatherService,
  ) {
    this.currentDate = new Date().toISOString();
  }


  personasListPage() {
    this.navCtrl.navigateForward('/tabs/personas-list');
  }

  async ngOnInit() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      this.getWeatherForecast(lat, lon);
      this.getCurrentWeather(lat, lon);
    } catch (err) {
      console.error('Error getting location', err);
    }

    // navigator.geolocation.getCurrentPosition((position) => {
    //   const lat = position.coords.latitude;
    //   const lon = position.coords.longitude;
    //   this.weatherService.getCurrentWeather(lat, lon).then((response) => {
    //     this.weatherData = response.data;
    //   });
    // });
      // const lat = 6.77253269951224;
      // const lon = -73.57559150916143;
      // this.weatherService.getCurrentWeather(lat, lon).then((response) => {
      //   this.weatherData = response.data;
      // });

      // this.getWeatherForecast(6.5187635, -74.105555);
      // this.getCurrentWeather(6.5187635, -74.105555);


  }

  getWeatherForecast(lat: number, lon: number) {
    this.weatherService.getWeatherForecast(lat, lon).subscribe((data: any) => {
      this.forecast = data.list;
    });
  }

  getCurrentWeather(lat: number, lon: number) {
    this.weatherService.getCurrentWeather(lat, lon).subscribe((data: any) => {
      this.currentWeather = data;
    });
  }

  getWindDirection(deg: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5);
    return directions[index % 16];
  }



}
