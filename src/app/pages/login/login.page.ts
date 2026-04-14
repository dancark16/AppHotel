import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';
  loginForm: FormGroup;
  user = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  pwd = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  errorMessage = {
    usuario: [
      { type: 'required', message: 'Usuario es requerido' },
      { type: 'pattern', message: 'Usuario no válido' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerida' },
      { type: 'pattern', message: 'No cumple los parámetros de una contraseña' },
    ]
  };

  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private serUtil: UtilsService,
    private ser: DbService) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [
        Validators.required,
        Validators.pattern(this.user)
      ]],
      password: ['', [
        Validators.required,
        //Validators.pattern(this.pwd)
      ]]
    });
  }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }

  get password() {
    return this.loginForm.get('password');
  }
  get usuario() {
    return this.loginForm.get('usuario');
  }

  submit(){
    const data = {
      usuario: this.usuario?.value,
      clave: this.password?.value
    }

    this.ser.login(data).subscribe(resp => {
      if(resp.estado){
        this.serUtil.set('user', resp?.info);
        this.ser.getMenuOpts(resp?.info?.id_rol).subscribe((resp2: any) => {
          this.serUtil.enviarList(resp2?.data);
        });
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        this.serUtil.showToast(resp.mensaje, "danger");
      }
    });
  }
}
