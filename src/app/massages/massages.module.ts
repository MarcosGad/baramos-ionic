import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MassagesPageRoutingModule } from './massages-routing.module';

import { MassagesPage } from './massages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MassagesPageRoutingModule,
  ],
  declarations: [MassagesPage]
})
export class MassagesPageModule {}
