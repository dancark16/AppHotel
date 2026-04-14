import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SignUpPage implements OnInit {
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';
  regForm: FormGroup;

  nameRegex = "^[a-zA-ZáéíóúñÁÉÍÓÚÑ ]+[a-zA-ZZáéíóúñÁÉÍÓÚÑ]{1,50}$";
  lastnameRegex = "^[a-zA-ZáéíóúñÁÉÍÓÚÑ ]+[a-zA-ZZáéíóúñÁÉÍÓÚÑ]{1,50}$";
  telRegex = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$";
  dateRegex = "^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$";
  userRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  pwdRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

  errorMessage = {
    nombres: [
      { type: 'required', message: 'Nombres es requerido' },
      { type: 'pattern', message: 'No es un nombre válido' }
    ],
    apellidos: [
      { type: 'required', message: 'Apellidos es requerido' },
      { type: 'pattern', message: 'No es un apellido válido' }
    ],
    celular: [
      { type: 'pattern', message: 'No es un número celular válido' }
    ],
    fechaNaci: [
      { type: 'required', message: 'La fecha de nacimiento es requerida' },
      { type: 'esInvalida', message: 'Ingrese una fecha válida' },
      { type: 'esIncorrecta', message: 'Debe tener el formato DD-MM-AAAA' },
      { type: 'esMenor', message: 'Debe ser mayor de edad' },
    ],
    usuario: [
      { type: 'required', message: 'Usuario es requerido' },
      { type: 'pattern', message: 'El usuario no válido' }
    ],
    password: [
      { type: 'required', message: '* Contraseña es requerida' },
      { type: 'pattern', message: '* Debe tener 8 carácteres <br>* Debe contener un número <br>* Debe contener una Mayúscula<br>* Debe contener un carácter especial' }
    ]
  };

  constructor(
    private util: UtilsService,
    private formBuilder: FormBuilder, 
    private router: Router, private ser: DbService) {
    this.regForm = this.initForm();
  }

  ngOnInit() {
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      nombres: ['', [
        Validators.required,
        Validators.pattern(this.nameRegex)
      ]],
      apellidos: ['', [
        Validators.required,
        Validators.pattern(this.lastnameRegex)
      ]],
      celular: ['', [
        Validators.pattern(this.telRegex)
      ]],
      fechaNaci: ['', [
        Validators.required,
        this.dobValidator,
        this.dateFormatValidator,
        this.isOldValidator
        //Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
      ]],
      usuario: ['', [
        Validators.required,
        Validators.pattern(this.userRegex)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(this.pwdRegex)
      ]]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }

  dateFormatValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let fechaNaci = new Date(control?.value);

    return fechaNaci.toString() != 'Invalid Date' ? null : { 'esIncorrecta': true };
  }

  isOldValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let fechaNaci = new Date(control?.value);
    let ahora = new Date();

    let anios = ahora.getFullYear() - fechaNaci.getFullYear();
    fechaNaci.setFullYear(ahora.getFullYear());
    
    if(ahora.getTime() < fechaNaci.getTime()){
      --anios;
    }

    return anios >= 18 ? null : { 'esMenor': true };
  }

  dobValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let fechaNaci = new Date(control?.value);
    let ahora = new Date();

    let anios = ahora.getFullYear() - fechaNaci.getFullYear();
    fechaNaci.setFullYear(ahora.getFullYear());
    
    if(ahora.getTime() < fechaNaci.getTime()){
      --anios;
    }

    return anios > 0 && anios < 100 ? null : { 'esInvalida': true };
  }
  
  get nombres() {
    return this.regForm.get('nombres');
  }

  get apellidos() {
    return this.regForm.get('apellidos');
  }

  get celular() {
    return this.regForm.get('celular');
  }

  get fechaNaci() {
    return this.regForm.get('fechaNaci');
  }

  get password() {
    return this.regForm.get('password');
  }

  get usuario() {
    return this.regForm.get('usuario');
  }


  guardar() {
    const data = {
      nombres: this.nombres?.value,
      apellidos: this.apellidos?.value,
      celular: this.celular?.value,
      fechaNaci: this.fechaNaci?.value,
      usuario: this.usuario?.value,
      clave: this.password?.value
    }
    this.ser.registro(data).subscribe(resp=> {
      //console.log(resp);
      if(resp.estado) {
        this.util.showToast(resp.mensaje);
        this.router.navigate(['/login']);
      } else {
        this.util.showToast(resp.mensaje, 'danger');
      }
    });
  }
}
