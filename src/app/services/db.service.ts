import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  path: string = 'http://dereckhotel.ueuo.com';

  constructor(private http: HttpClient, private serUtil: UtilsService) { }
  
  /** Auth **/
  login(data: any) {
    const URL = this.path + "/login";
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  registro(data: any){
    const URL = this.path + "/signup";
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  getMenuOpts(id: number) {
    const URL = this.path + "/menu/"+id;
    return this.http.get<any[]>(URL);
  }

  /** Reservations **/
  getTiposHabitaciones(){
    const URL = this.path + "/tiposhabitaciones";
    return this.http.get<any>(URL);
  }

  getPisos(id: number){
    const URL = this.path + "/pisos/"+id;
    return this.http.get<any>(URL);
  }

  getNumerosHab(tipo: number, piso: number){
    const URL = this.path + "/numhabitaciones/"+ tipo + "/" + piso;
    return this.http.get<any>(URL);
  }

  getServicios(){
    const URL = this.path + "/servicios";
    return this.http.get<any>(URL);
  }

  getHabitacion(id:number) {
    const URL = this.path + "/habitacionxid/" + id;
    return this.http.get<any>(URL);
  }

  reservar(data:any) {
    const URL = this.path + "/reservar";
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  /* Admin Reservations */

  habByUser(id: number){
    const URL = this.path + "/habitacionesreservadas/" + id;
    return this.http.get<any>(URL);
  }

  atenderReserva(data:any){
    const URL = this.path + "/atender";
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  cancelarReserva(data:any) {
    const URL = this.path + "/cancelarreserva";
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  /* Reports */
  estadosHabitacion() {
    const URL = this.path + "/estadohabitaciones";
    return this.http.get<any>(URL);
  }

  getAdminHabitaciones(id: number){
    const URL = this.path + "/infohabitaciones/"+id;
    return this.http.get<any>(URL);
  }

  /* Admin Rooms */
  habilitar(data:any){
    const URL = this.path + "/ponerdisponible";
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  darMantenimiento(data:any){
    const URL = this.path + "/darmantenimiento";
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }
}
