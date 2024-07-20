import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeClimaPageRoutingModule } from './home-clima-routing.module';

import { HomeClimaPage } from './home-clima.page';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeClimaPageRoutingModule,
    HighchartsChartModule
  ],
  declarations: [HomeClimaPage]
})
export class HomeClimaPageModule {}
