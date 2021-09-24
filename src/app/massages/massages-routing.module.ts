import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MassagesPage } from './massages.page';

const routes: Routes = [
  {
    path: '',
    component: MassagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MassagesPageRoutingModule {}
