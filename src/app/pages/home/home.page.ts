import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  esAdmin: boolean = false;
  usuario: string = '';

  constructor(private serUtil: UtilsService, private ch: ChangeDetectorRef) { }

  ngOnInit(): void {
    const { nombres, apellidos, id_rol } = this.serUtil.get('user');
    this.usuario = `${nombres} ${apellidos}`;
    this.esAdmin = id_rol == 1;
    this.ch.detectChanges();
  }

  ngOnDestroy(): void {

  }
}
