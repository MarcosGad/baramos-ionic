import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HsystemPageRoutingModule } from './hsystem-routing.module';

import { HsystemPage } from './hsystem.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HsystemPageRoutingModule
  ],
  declarations: [HsystemPage]
})
export class HsystemPageModule {}
