import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonasAddPageRoutingModule } from './personas-add-routing.module';

import { PersonasAddPage } from './personas-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonasAddPageRoutingModule
  ],
  declarations: [PersonasAddPage]
})
export class PersonasAddPageModule {}
