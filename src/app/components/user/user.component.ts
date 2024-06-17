import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { jwtDecode } from "jwt-decode";
import { CONTACTO } from '../../models/contacto';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { USER } from '../../models/user';

export interface IDUSER {
  ID:number
}


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  listContacto: CONTACTO[] = [];
  contact: IDUSER = {
    ID: 0
  }

  user: IDUSER = {
    ID: 0
  }

  objUsuario: USER = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    rol: ''
  }

  objContacto: CONTACTO = {
    id: 0,
    numero: '',
    email: '',
    direccion: ''
  }

  UsuarioEditar:boolean=false;
  ContactoEditar:boolean=false;
  ContactoAgregar:boolean=false;
  ProfesionEditar:boolean=false;
  ServicioEditar:boolean=false;

  constructor(
    private router: Router,
    private userService: UserService,
    private _formBuilder: FormBuilder
  ){}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    let decodeToken: any = {};

    if(localStorage.getItem('idUser')){
      this.Usuario(Number(localStorage.getItem('idUser')))
    }else{
      try {
        decodeToken = jwtDecode(token || '');
        this.objUsuario.id = decodeToken.id; 
        this.objUsuario.nombre = decodeToken.nombre; 
        this.objUsuario.apellido = decodeToken.apellido; 
        this.objUsuario.email = decodeToken.email; 
        this.Contacto(decodeToken.id)
      } catch (error) {
        console.error('Error decoding token', error);
      }
    }




  



  }

  usuarioFormGroup = this._formBuilder.group({
    nombreCtrl: ['', [Validators.required]],
    apellidoCtrl: ['', [Validators.required]],
    emailCtrl: ['', [Validators.required]],
  });

  contactoFormGroup = this._formBuilder.group({
    numeroCtrl: ['', [Validators.required]],
    emailCtrl: ['', [Validators.required]],
    direccionCtrl: ['', [Validators.required]],
  });

  profesionFormGroup = this._formBuilder.group({
    nombreCtrl: ['', [Validators.required]],
    apellidoCtrl: ['', [Validators.required]],
    emailCtrl: ['', [Validators.required]],
  });

  ServicioFormGroup = this._formBuilder.group({
    nombreCtrl: ['', [Validators.required]],
    apellidoCtrl: ['', [Validators.required]],
    emailCtrl: ['', [Validators.required]],
  });


  Usuario(id:number){
      this.user.ID = id;
      this.userService.UsuarioId(this.user).pipe(
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
            this.objUsuario = res[0];
            console.log('en editar ', this.objUsuario);
            this.Contacto(this.objUsuario.id)
          },
          error: (err) => {
            console.error(err);
          },
        });  
    
  }

  Contacto(id:number){
    console.log('en contacto id ', id);
    this.contact.ID = id;
    this.userService.Contactos(this.contact).pipe(
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

  editarUsuario(){
    this.UsuarioEditar = true;
    this.usuarioFormGroup.controls.nombreCtrl.setValue( this.objUsuario.nombre);
    this.usuarioFormGroup.controls.apellidoCtrl.setValue( this.objUsuario.apellido);
    this.usuarioFormGroup.controls.emailCtrl.setValue( this.objUsuario.email);
  }
  
  editarContacto(contacto:CONTACTO){
    this.objContacto.id = contacto.id
    this.ContactoEditar = true;
    this.contactoFormGroup.controls.numeroCtrl.setValue( contacto.numero);
    this.contactoFormGroup.controls.emailCtrl.setValue( contacto.email);
    this.contactoFormGroup.controls.direccionCtrl.setValue( contacto.direccion);
  }

  editarProfesion(contacto:CONTACTO){
    this.ContactoEditar = true;
    this.contactoFormGroup.controls.numeroCtrl.setValue( contacto.numero);
    this.contactoFormGroup.controls.emailCtrl.setValue( contacto.email);
    this.contactoFormGroup.controls.direccionCtrl.setValue( contacto.direccion);
  }

  editarServicio(contacto:CONTACTO){
    this.ContactoEditar = true;
    this.contactoFormGroup.controls.numeroCtrl.setValue( contacto.numero);
    this.contactoFormGroup.controls.emailCtrl.setValue( contacto.email);
    this.contactoFormGroup.controls.direccionCtrl.setValue( contacto.direccion);
  }

  saveUsuario(){
    this.objUsuario.nombre = this.usuarioFormGroup.controls.nombreCtrl.getRawValue()!;
    this.objUsuario.apellido = this.usuarioFormGroup.controls.apellidoCtrl.getRawValue()!;
    this.objUsuario.email = this.usuarioFormGroup.controls.emailCtrl.getRawValue()!;
  
    this.userService.UsuarioUpdate(this.objUsuario).pipe(
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
          console.log(res[0]);
          console.log(this.objUsuario.id);
          this.Usuario(this.objUsuario.id)
          this.UsuarioEditar = false;
        },
        error: (err) => {
          console.error(err);
        },
      });  
  }

  saveContacto(){
    this.objContacto.numero = this.contactoFormGroup.controls.numeroCtrl.getRawValue()!;
    this.objContacto.email = this.contactoFormGroup.controls.emailCtrl.getRawValue()!;
    this.objContacto.direccion = this.contactoFormGroup.controls.direccionCtrl.getRawValue()!;

  
    this.userService.ContactoUpdate(this.objContacto).pipe(
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
          console.log(res[0]);
          console.log(this.objUsuario.id);
          this.Contacto(this.objContacto.id)
          this.ContactoEditar = false;
        },
        error: (err) => {
          console.error(err);
        },
      });  
  }


  private handleError(errorMessage: string): void {
    alert(errorMessage);
  }

  BackUsuario(){
    this.UsuarioEditar = false;
  }

  BackContacto(){
    this.ContactoEditar = false;
  }

  addContacto(){
    this.ContactoAgregar = true;
  }
  

}
