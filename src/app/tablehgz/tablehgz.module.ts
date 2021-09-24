import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablehgzPageRoutingModule } from './tablehgz-routing.module';

import { TablehgzPage } from './tablehgz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablehgzPageRoutingModule
  ],
  declarations: [TablehgzPage]
})
export class TablehgzPageModule {}
