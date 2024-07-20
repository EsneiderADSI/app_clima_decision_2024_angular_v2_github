import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuTabsCompComponent } from './components/menu-tabs-comp/menu-tabs-comp.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DatabaseService } from './services/database.service';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { WeatherService } from './services/weather.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { TemperatureChartComponent } from './components/temperature-chart/temperature-chart.component';





@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent, MenuTabsCompComponent, TemperatureChartComponent],
  imports: [BrowserModule, IonicModule.forRoot({ mode: 'md' }), AppRoutingModule, HttpClientModule, HighchartsChartModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, DatabaseService, WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    if (Capacitor.isNative) {
      Geolocation.requestPermissions().then(() => {
        // La aplicación tiene permisos para acceder a la ubicación del dispositivo.
      }, err => {
        // La aplicación no tiene permisos para acceder a la ubicación del dispositivo.
      });
    }
  }
}
