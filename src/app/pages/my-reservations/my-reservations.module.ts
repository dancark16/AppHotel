import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyReservationsPageRoutingModule } from './my-reservations-routing.module';

import { MyReservationsPage } from './my-reservations.page';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { QrDetailComponent } from './qr-detail/qr-detail.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    QRCodeModule,
    MyReservationsPageRoutingModule
  ],
  declarations: [MyReservationsPage, QrDetailComponent]
})
export class MyReservationsPageModule {}
