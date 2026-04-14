import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationManagementPage } from './reservation-management.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationManagementPageRoutingModule {}
