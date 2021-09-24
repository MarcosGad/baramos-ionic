import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablehgzPage } from './tablehgz.page';

const routes: Routes = [
  {
    path: '',
    component: TablehgzPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablehgzPageRoutingModule {}
