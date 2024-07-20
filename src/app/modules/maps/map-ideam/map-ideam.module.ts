import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapIdeamPageRoutingModule } from './map-ideam-routing.module';

import { MapIdeamPage } from './map-ideam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapIdeamPageRoutingModule
  ],
  declarations: [MapIdeamPage]
})
export class MapIdeamPageModule {}
