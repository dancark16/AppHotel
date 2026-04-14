import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qr-detail',
  templateUrl: './qr-detail.component.html',
  styleUrls: ['./qr-detail.component.scss'],
})
export class QrDetailComponent implements OnInit {
  @Input() item!:any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cerrar(){
    this.modalCtrl.dismiss();
  }
}
