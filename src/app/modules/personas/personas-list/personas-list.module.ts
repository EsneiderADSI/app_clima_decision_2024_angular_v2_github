import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonasListPageRoutingModule } from './personas-list-routing.module';

import { PersonasListPage } from './personas-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonasListPageRoutingModule
  ],
  declarations: [PersonasListPage]
})
export class PersonasListPageModule {}
