import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private currentWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'e10c846612ece0112a5b9a3431e8356d';

  constructor(private http: HttpClient) {
    axios.defaults.params = {};
    axios.defaults.params['appid'] = 'e10c846612ece0112a5b9a3431e8356d';
  }

  // getCurrentWeather(lat: number, lon: number) {
  //   return axios.get('https://api.openweathermap.org/data/2.5/weather', {
  //     params: {
  //       lat: lat,
  //       lon: lon,
  //       units: 'metric'
  //     }
  //   });
  // }

  getWeatherForecast(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  getCurrentWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.currentWeatherApiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }
}
