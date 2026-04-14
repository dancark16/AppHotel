import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DbService } from 'src/app/services/db.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.page.html',
  styleUrls: ['./reservation-management.page.scss'],
})
export class ReservationManagementPage implements OnInit {
  textBuscar: string = '';
  selectId: string = 'all';
  data: any[] = [];
  dataSegment: any[] = [];

  constructor(private barcodeScanner: BarcodeScanner, private ser: DbService, private util: UtilsService) {

  }

  ngOnInit() {
    this.getData(1);
  }

  getData(id: number){
    this.ser.getAdminHabitaciones(id).subscribe(resp => {
      this.data = resp.data;
      console.log(this.data);
    });  
  }

  cambiartext(event: any) {
    this.textBuscar = event.target.value;
    if (this.textBuscar == '') {

    }
  }

  onChange(event: any) {
    this.selectId = event.target.value;
    this.setFilterData(this.data);
  }

  setFilterData(data: any) {
    switch (this.selectId) {
      case 'all': {
        this.getData(1);
        break;
      }
      case 'reserve': {
        this.getData(2); 
        break;
      }
      case 'busy': {
        this.getData(3); 
        break;
      }
      case 'cleaning': {
        this.getData(4); 
        break;
      }
      default: {
        break;
      }
    }
  }

  async buscar() {

  }

  scanearCodigo() {
    this.barcodeScanner.scan().then((barcodeData: any) => {
      console.log('Barcode data', barcodeData);
      let codigo = JSON.parse(JSON.stringify(barcodeData))?.text;
      const data = { codigo };
      this.ser.atenderReserva(data).subscribe(resp=> {
        if(resp.estado){
          this.util.showToast(resp.mensaje);
        } else {
          this.util.showToast(resp.mensaje, 'warning');
        }
      })
    }).catch((err: any) => {
      console.log('Error', err);
    });
  }

  habilitarRoom(item: any){
    const data = {id_habitacion: item.id};
    this.ser.habilitar(data).subscribe(resp => {
      if(resp.estado) {
        this.util.showToast(resp.mensaje);
        this.getData(item.id_estado);
      } else {
        this.util.showToast(resp.mensaje, 'danger');
      }
    });
  }

  limpiarRoom(item: any){
    const data = {id_habitacion: item.id};
    this.ser.darMantenimiento(data).subscribe(resp => {
      if(resp.estado) {
        this.util.showToast(resp.mensaje);
        this.getData(item.id_estado);
      } else {
        this.util.showToast(resp.mensaje, 'danger');
      }
    });
  }
}
