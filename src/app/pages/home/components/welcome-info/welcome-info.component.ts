import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-info',
  templateUrl: './welcome-info.component.html',
  styleUrls: ['./welcome-info.component.scss'],
})
export class WelcomeInfoComponent implements OnInit {
  slides: any[] = [
    { url: 'https://images.pexels.com/photos/2111768/pexels-photo-2111768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'beach' },
    { url: 'https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_960_720.jpg', title: 'boat' },
    { url: 'https://images.pexels.com/photos/12127447/pexels-photo-12127447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'forest' },
    { url: 'https://cdn.pixabay.com/photo/2020/04/17/12/28/pool-5055009_960_720.jpg', title: 'city' },
    { url: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'italy' },
  ];

  servicios: any [] = [
    {
      title: 'El Restaurante',
      url: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      detail: 'Ofrecemos la mejor gastronomía del país, pero tambien contamos te complacemos.'
    },
    {
      title: 'Nuestros Dormitorios',
      url: 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=11',
      detail: 'Contamos con dormitorios confortables y elegantes para que puedas descansar.'
    },
    {
      title: 'Te recibimos con una sonrisa',
      url: 'https://images.pexels.com/photos/7820310/pexels-photo-7820310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      detail: 'Nuestro personal está capacitado para atenderte y brindarte una excelente acogida.'
    }
    
  ];

  constructor() {
   
  }

  ngOnInit() { }

}
