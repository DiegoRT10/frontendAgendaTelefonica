import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN} from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Token } from '../../models/token';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  user: LOGIN = {
    EMAIL: '',
    PASSWORD: '',
  };

  objToken: Token = {
    token: ""
  }

  hide = true;
  errEmail = true;
  errPass = true;
  decodeToken: any = {};

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  

  ngOnInit(): void {
    
  }

  FormGroup = this._formBuilder.group({
    emailCtrl: ['', [ Validators.required, Validators.email]],
    passwordCtrl: ['', [Validators.required]],
  });

  getErrorMessageEmail() {
    if (this.FormGroup.controls.emailCtrl.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.FormGroup.controls.emailCtrl.hasError('email') ? 'Correo no valido' : '';
  }

  getErrorMessagePassword() { 
      return this.FormGroup.controls.passwordCtrl.hasError('required') ? 'Debes ingresar un valor' : '';
  }

  loginKeyPress(event: any) {
    if (event.key == 'Enter') {
      this.send();
      event.preventDefault();
     
    }
  }

 send(){
  this.user.EMAIL =  this.FormGroup.controls.emailCtrl.value!
  this.user.PASSWORD =  this.FormGroup.controls.passwordCtrl.value!
  this.authService.singin(this.user).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 400:
          this.handleError('Error general.');
          break;
        case 401:
          this.handleError('Falta token.');
          break;
        case 404:
          this.handleError('No se encontró la consulta.');
          break;
        case 406:
          this.handleError('Problemas con la integridad de las llaves.');
          break;
        case 422:
          this.handleError('Error de esquema.');
          break;
        default:
          this.handleError(error.message);
          break;
      }
      return [];
    })).subscribe({
      next: (res) => {
        this.objToken = res;
        
        localStorage.setItem('token', this.objToken.token.toString());

        if(localStorage.getItem('token') != 'undefined'){
          try {
            this.decodeToken = jwtDecode(this.objToken.token.toString() || '');
          } catch (error) {
            console.error('Error decoding token', error);
            this.router.navigate(['login']);
          }

          console.log('data ', this.decodeToken.rol)

          switch(this.decodeToken.rol){
            case 1 : this.router.navigate(['homeAdmin']);
            break;
            case 2 : this.router.navigate(['homeUser']);
            break;
            default : this.router.navigate(['login']);
            break;
          }
          
        }else{
          alert('Usuario no encontrado');
        }
          
      },
      error: (err) => {
        console.error(err);
      },
    });  
}

private handleError(errorMessage: string): void {
  alert(errorMessage);
}

}

