import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationManagementPageRoutingModule } from './reservation-management-routing.module';

import { ReservationManagementPage } from './reservation-management.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReservationManagementPageRoutingModule
  ],
  declarations: [ReservationManagementPage]
})
export class ReservationManagementPageModule {}
