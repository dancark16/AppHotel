import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { nanoid } from 'nanoid'
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';
import { FileOpenerOptions } from '@capacitor-community/file-opener/dist/esm/definitions';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() idHab!: number;
  @Input() serOpts!: any[];
  @Input() dateStart!: string;
  @Input() dateEnd!: string;
  objHab: any;
  comentario: string = '';
  pdfObj = null;
  nombreCliente: string = '';
  codigo: any;

  constructor(private modalCtrl: ModalController,
    private util: UtilsService,
    private alertCtrl: AlertController,
    private router: Router,
    private ser: DbService,
    private plt: Platform) { }

  ngOnInit() {
    this.ser.getHabitacion(this.idHab).subscribe(resp => {
      if (resp.estado) {
        this.objHab = resp?.data;
        this.objHab.precioxnoche = parseFloat(this.objHab.precioxnoche); 
        console.log(this.objHab);
      }
    });

    const { nombres, apellidos } = this.util.get('user');
    this.nombreCliente = `${nombres} ${apellidos}`;
    if (this.serOpts.length > 0) {
      this.serOpts = this.serOpts.map(d => {
        return {
          id: d?.id,
          detalle: d?.detalle,
          precio: d?.precio,
          total: d?.es_fijo ? d?.precio : (d?.precio * this.noches())
        };
      });
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  noches() {
    return this.diffNight(this.dateEnd, this.dateStart) || 0;
  }

  diffNight(dateEnd: string, dateInit: string) {
    let x = new Date(dateEnd);
    let y = new Date(dateInit);
    x.setUTCHours(-5, 0, 0, 0);
    y.setUTCHours(-5, 0, 0, 0);
    let tiempo = x.getTime() - y.getTime();

    return Math.floor(tiempo / (1000 * 60 * 60 * 24));
  }

  calcularEstadia() {
    return this.noches() * this.objHab?.precioxnoche;
  }

  total() {
    let totSer = this.serOpts.length > 0 ? this.serOpts.map(d => d?.total).reduce((a, b) => a + b) : 0;
    return this.calcularEstadia() + totSer;
  }

  guardar() {
    let servicios = this.serOpts.length > 0 ? this.serOpts.map(d => d?.id) : [];

    const data = {
      id_usuario: this.util.get('user')?.id_usr,
      id_habitacion: this.idHab,
      codigo: nanoid(),
      fecha_ingreso: this.dateStart,
      fecha_salida: this.dateEnd,
      comentarios: this.comentario,
      total: this.total(),
      servicios: JSON.stringify(servicios)
    }
    this.codigo = data.codigo;

    this.ser.reservar(data).subscribe(resp => {
      if (resp.estado) {
        this.pdfDownload();
        this.showAlertSuccess();
      } else {
        this.util.showToast(resp.mensaje, 'danger');
      }
    });
  }

  async showAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación de Resevación',
      subHeader: '🤩 ¿Está segur@ de confirmar su reservación?',
      message: 'Al confirmar se le deacargara su ticket de reservación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    
    if(role=='confirm'){
      this.guardar();
    }
  }

  showAlertSuccess() {
    this.alertCtrl.create({
      header: "Reservación exitosa",
      message: "Para ver el código único de su reservación puede ir a Menu > Mis Reservaciones.",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.modalCtrl.dismiss();
            this.router.navigateByUrl('/home', { replaceUrl: true });
          }
        }
      ]
    }).then((alertEl: any) => alertEl.present());
  }

  construirData() {
    let arr = [];
    arr.push(
      {
        detalle: `Hab. ${this.objHab?.nombre} x ${this.noches()} ${this.noches() > 1 ? 'noches' : 'noches'}`,
        precio: `$ ${this.objHab?.precioxnoche.toFixed(2)}`,
        total: `$ ${this.calcularEstadia().toFixed(2)}`
      }
    );

    let servicios = this.serOpts.length > 0 ? this.serOpts : [];
    for (let i = 0; i < servicios.length; i++) {
      arr.push(
        {
          detalle: `${servicios[i]?.detalle}`,
          precio: `$ ${parseFloat(servicios[i]?.precio).toFixed(2)}`,
          total: `$ ${parseFloat(servicios[i]?.total).toFixed(2)}`
        }
      );
    }
    return arr;
  }

  pdfDownload() {

    const docDef: any = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [20, 10, 40, 60],

      content: [
        { text: "Reservación en Dereck's Hotel", style: 'header', alignment: 'center', color: '#006d77' },
        { text: `Habitación ${this.objHab?.nombre} ($ ${this.objHab?.precioxnoche.toFixed(2)} x Noche)`, style: 'subheader' },
        { text: `Desde: ${this.dateStart} - Hasta: ${this.dateEnd}` },
        { text: `Ubicación: ${this.objHab.ubicacion}` },
        { text: `# ${this.objHab?.numero}\n\n` },
        { text: `Cliente: ${this.nombreCliente}\n\n\n`, alignment: 'right' },
        this.table(this.construirData(), ['detalle', 'precio', 'total']),
        { text: '\n\n' },
        { qr: `${this.codigo}`, fit: '150', alignment: 'right' },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        },
        subheader: {
          fontSize: 14
        }
      }
    }

    const pdfDocGenerator = pdfMake.createPdf(docDef);

    if (this.plt.is('cordova')) {
      pdfDocGenerator.getBase64(async (data) => {
        try {
          let path = `reservacion_${Date.now()}.pdf`;
          const result = await Filesystem.writeFile({
            path,
            data,
            directory: Directory.Documents
          });
          const options: FileOpenerOptions = {
            filePath: `${result.uri}`,
            contentType: 'application/pdf'
          };
          FileOpener.open(options);
        } catch (error) {
          console.error(error);
        }
      });
    } else {
      pdfDocGenerator.download();
    }
  }

  table(data: any, columns: any) {
    return {
      table: {
        widths: ['*', 100, 100],
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      }
    };
  }

  buildTableBody(data: Array<any>, columns: Array<any>) {
    let body = [];
    body.push([
      { text: 'DETALLE', alignment: 'center', bold: true },
      { text: 'P. UNIT', alignment: 'center', bold: true },
      { text: 'TOTAL', alignment: 'center', bold: true }
    ]);

    data.forEach((row: any) => {
      let dataRow: any[] = [];
      columns.forEach((column: any) => {
        if (column != 'detalle') {
          dataRow.push({ text: `${row[column].toString()}`, alignment: 'right' })
        } else {
          dataRow.push(row[column].toString());
        }
      })

      body.push(dataRow);
    });

    body.push([
      { text: 'TOTAL A PAGAR', colSpan: 2, alignment: 'center', bold: true },
      {},
      { text: `$ ${parseFloat(this.total()).toFixed(2)}`, alignment: 'right', bold: true }
    ]);

    return body;
  }
}
