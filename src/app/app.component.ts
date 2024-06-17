import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-agendaTelefonica';

  constructor(
    private router : Router
  ){

  }

  info(){
    localStorage.removeItem('idUser')
    this.router.navigate(['User'])
  }
}
