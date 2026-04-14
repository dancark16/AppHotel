import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  objPersona: any;

  constructor(private serUtil: UtilsService) { }

  ngOnInit() {
    this.objPersona = this.serUtil.get('user');
  }

}
