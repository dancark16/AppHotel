import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.page.html',
  styleUrls: ['./reserve.page.scss'],
})
export class ReservePage implements OnInit {
  optsHabitacion: any[] = [];
  optsPisos: any[] = [];
  servicios: any[] = [];
  numeros: any[] = [];
  idtipo: number = 0;
  idPiso: number = 0;
  idHab: number = 0;
  deshabilitarP: boolean = false;
  deshabilitarN: boolean = false;
  dateStart: string = '';
  dateEnd: string = '';

  constructor(private serDB: DbService,
    private utilService: UtilsService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.serDB.getTiposHabitaciones().subscribe(data => {
      this.optsHabitacion = data?.data;
    });

    this.serDB.getServicios().subscribe(data => {
      this.servicios = data?.data.map((obj: any) => {
        let rObj = { id: 0, detalle: '', icono: '', es_opcional: false, isChecked: false, es_fijo: true, precio: 0 };
        rObj = JSON.parse(JSON.stringify(obj));
        rObj['precio'] = Number(rObj['precio']);
        rObj['isChecked'] = !obj?.es_opcional;
        return rObj;
      });
    })
  }

  selectTipo(event: any) {
    this.idtipo = event.detail.value;
    this.optsPisos = [];
    this.idPiso = 0;
    this.idHab = 0;
    this.serDB.getPisos(this.idtipo).subscribe(resp => {
      if (resp.estado) {
        this.deshabilitarP = true;
        this.deshabilitarN = false;
        this.numeros = [];
        this.optsPisos = resp?.data;
      } else {
        this.utilService.showToast(resp?.mensaje, 'laurel');
      }
    })
  }

  selectPiso(event: any) {
    this.idPiso = event.detail.value;
    this.numeros = [];
    this.serDB.getNumerosHab(this.idtipo, this.idPiso).subscribe(resp => {
      if (resp.estado) {
        this.deshabilitarN = true;
        this.numeros = resp?.data;
      }
    });
  }

  toggle(event: any, i: number) {
    this.servicios[i].isChecked = event.detail.checked;
  }

  deshabilitarBtn() {
    return this.idHab == 0;
  }

  async openDetail() {
    if (this.dateStart.length == 0) {
      this.utilService.showToast('Seleccione una fecha de ingreso', 'warning');
      return;
    }

    if (this.dateEnd.length == 0) {
      this.utilService.showToast('Seleccione una fecha de salida', 'warning');
      return;
    }

    let serOpts = this.servicios.filter(std => std.es_opcional == 1 && std.isChecked);
    
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        idHab: this.idHab,
        serOpts,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      },
      cssClass: 'small-modal',
      backdropDismiss: true,
      showBackdrop: true
    });

    await modal.present();
  }

}
