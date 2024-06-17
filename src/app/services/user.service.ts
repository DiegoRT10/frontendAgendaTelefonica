import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { USER } from '../models/user';
import { CONTACTO } from '../models/contacto';
import { IDUSER } from '../components/home-user/home-user.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private URL = environment.port;
  constructor (private http: HttpClient, private jwtHelper: JwtHelperService) {  
  }

  Users():Observable<USER[]>{
    return this.http.get<USER[]>(`${this.URL}/user/all`);
  }

  UsuarioId(id:IDUSER):Observable<USER[]>{
    return this.http.post<USER[]>(`${this.URL}/user/userid`,id);
  }

  UsuarioUpdate(user:USER):Observable<USER[]>{
    return this.http.put<USER[]>(`${this.URL}/user/updateUsuario`,user);
  }

  
  
  Contactos(id:IDUSER):Observable<CONTACTO[]>{
    return this.http.post<CONTACTO[]>(`${this.URL}/user/contactos`,id);
  }

  ContactoUpdate(contacto:CONTACTO):Observable<CONTACTO[]>{
    return this.http.put<CONTACTO[]>(`${this.URL}/user/updateContacto`,contacto);
  }
}
