import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonasListPage } from './personas-list.page';

const routes: Routes = [
  {
    path: '',
    component: PersonasListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonasListPageRoutingModule {}
