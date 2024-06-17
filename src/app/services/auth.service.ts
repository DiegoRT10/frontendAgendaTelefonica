import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '../models/token';
import { LOGIN, USER } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  private URL = environment.port;
 
  constructor (private http: HttpClient, private jwtHelper: JwtHelperService) {  
  }





  singin(user:LOGIN):Observable<Token>{
    return this.http.post<Token>(`${this.URL}/user/singin`,user);
  }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(token != 'undefined'){
      if(this.jwtHelper.isTokenExpired(token || '') || !localStorage.getItem('token')){
        return false;
      }
    }else{
      return false;
    }
    
  return true;
  }
}
