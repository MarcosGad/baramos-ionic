import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloaddPageRoutingModule } from './downloadd-routing.module';

import { DownloaddPage } from './downloadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloaddPageRoutingModule
  ],
  declarations: [DownloaddPage]
})
export class DownloaddPageModule {}
