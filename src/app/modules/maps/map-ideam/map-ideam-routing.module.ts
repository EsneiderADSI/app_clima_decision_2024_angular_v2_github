import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapIdeamPage } from './map-ideam.page';

const routes: Routes = [
  {
    path: '',
    component: MapIdeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapIdeamPageRoutingModule {}
