import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloaddPage } from './downloadd.page';

const routes: Routes = [
  {
    path: '',
    component: DownloaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloaddPageRoutingModule {}
