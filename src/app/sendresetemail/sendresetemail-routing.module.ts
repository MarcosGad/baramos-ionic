import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendresetemailPage } from './sendresetemail.page';

const routes: Routes = [
  {
    path: '',
    component: SendresetemailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendresetemailPageRoutingModule {}
