import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Subscription } from 'rxjs/internal/Subscription';
import { DbService } from 'src/app/services/db.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  year = new Date().getFullYear();
  menu!: Observable<any>;
  subscription!: Subscription;

  constructor(private ser: DbService, 
    private alertCtrl: AlertController,
    private serUtil: UtilsService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.serUtil.$getListSource.subscribe(resp => {
      this.menu = of (resp);
    }); 

    let id = this.serUtil.get('user')?.id_rol;
  
    if(id) {
      this.subscription = this.ser.getMenuOpts(id).subscribe((resp: any) => {
        this.menu = of (resp?.data);
      }); 
    } 
  }

  cerrarSesion() {
    this.alertCtrl.create({
      header: "Cerrar Sesión",
      message: "¿Desea de Cerrar Sesión?",
      buttons: [
        {
          text: "Sí 👋",
          handler: () => {
            this.serUtil.clear();    
            this.subscription.unsubscribe();
            this.router.navigateByUrl('/login', { replaceUrl: true }); 
          }
        },
        { text: "No ✋" }
      ]
    }).then(alertEl => alertEl.present());
  }
}
