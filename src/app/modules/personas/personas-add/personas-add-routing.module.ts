import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonasAddPage } from './personas-add.page';

const routes: Routes = [
  {
    path: '',
    component: PersonasAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonasAddPageRoutingModule {}
