import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { UtilsService } from 'src/app/services/utils.service';
import { QrDetailComponent } from './qr-detail/qr-detail.component';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.page.html',
  styleUrls: ['./my-reservations.page.scss'],
})
export class MyReservationsPage implements OnInit {
  hab:any[]=[];

  constructor(
    private ser: DbService,
    private util: UtilsService,
    private modalCtrl: ModalController, private alertController: AlertController) { }

  ngOnInit() {
    this.cargarInfo();
  }

  cargarInfo(){
    let id = this.util.get('user')?.id_usr;
    this.ser.habByUser(id).subscribe(resp => {
      this.hab = resp.data;
    });
  }

  async openQrDetail(item: any) {
    const modal = await this.modalCtrl.create({
      component: QrDetailComponent,
      componentProps: {
        item
      },
      cssClass: 'small-modal',
      backdropDismiss: true,
      showBackdrop: true
    });

    await modal.present();
  }

  async presentAlert(item: any) {
    const alert = await this.alertController.create({
      header: 'Eliminación de Resevación',
      subHeader: '😟 ¿Está segur@ de eliminar su reservación?',
      message: 'Al eliminar esta reservación no se podrá recuperla',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //this.roleMessage = `Dismissed with role: ${role}`;
    if(role=='confirm'){
      this.eliminar(item);
      this.cargarInfo();
    }
  }

  eliminar(item: any) {
    const data = {id: item.id};
    this.ser.cancelarReserva(data).subscribe(resp=> {
      if(resp.estado){
        this.util.showToast(resp.mensaje);
      } else {
        this.util.showToast(resp.mensaje, 'danger');
      }
    });
  }
}
