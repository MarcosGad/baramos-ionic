import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewhagzPageRoutingModule } from './viewhagz-routing.module';

import { ViewhagzPage } from './viewhagz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewhagzPageRoutingModule
  ],
  declarations: [ViewhagzPage]
})
export class ViewhagzPageModule {}
