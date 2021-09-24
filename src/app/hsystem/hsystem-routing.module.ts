import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HsystemPage } from './hsystem.page';

const routes: Routes = [
  {
    path: '',
    component: HsystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HsystemPageRoutingModule {}
