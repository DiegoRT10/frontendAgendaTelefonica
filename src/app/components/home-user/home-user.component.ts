import { Component, OnInit, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatAccordion } from '@angular/material/expansion';
import { USER } from '../../models/user';
import { catchError } from 'rxjs';
import { CONTACTO } from '../../models/contacto';
import { FormBuilder, Validators } from '@angular/forms';

export interface IDUSER {
  ID:number
}

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.scss'
})
export class HomeUserComponent implements OnInit{

  listUser: USER[] = [];
  listContacto: CONTACTO[] = [];
  listUserFiltrada: USER[] = [];
  user: IDUSER = {
    ID: 0
  }
  accordion = viewChild.required(MatAccordion);
  prueba:string = "";
  

  constructor(
    private router: Router,
    private userService: UserService,
    private _formBuilder: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.getUser();
    console.log(this.prueba);
    this.firstFormGroup.valueChanges.subscribe((value) => {
      let filtrado: any[] = [];
      
    for (let i = 0; i < this.listUser.length; i++) {
      let user = this.listUser[i];
      if (user.nombre === value.searchCtrl || user.apellido === value.searchCtrl) {
        filtrado.push(user);
      }
    }

    this.listUserFiltrada = filtrado;
     });
  }

  firstFormGroup = this._formBuilder.group({
    searchCtrl: ['', [Validators.required]],
  });
  
  getUser(){
    this.userService.Users().pipe(
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
          this.listUser = res;
        },
        error: (err) => {
          console.error(err);
        },
      });  
  }


  Contacto(id:number){
    console.log(this.prueba);
    this.user.ID = id;
    this.userService.Contactos(this.user).pipe(
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
          this.listContacto = res;
        },
        error: (err) => {
          console.error(err);
        },
      });  
  }

  private handleError(errorMessage: string): void {
    alert(errorMessage);
  }

  capturaInput(){
    console.log(this.prueba);
  }

  editar(id:number){
    localStorage.setItem('idUser', id.toString());
    this.router.navigate(['User'])
  }
  
}
