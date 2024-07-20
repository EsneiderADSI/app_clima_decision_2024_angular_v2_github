import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeClimaPage } from './home-clima.page';

const routes: Routes = [
  {
    path: '',
    component: HomeClimaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeClimaPageRoutingModule {}
