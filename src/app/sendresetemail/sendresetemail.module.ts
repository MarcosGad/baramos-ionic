import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendresetemailPageRoutingModule } from './sendresetemail-routing.module';

import { SendresetemailPage } from './sendresetemail.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SendresetemailPageRoutingModule
  ],
  declarations: [SendresetemailPage]
})
export class SendresetemailPageModule {}
