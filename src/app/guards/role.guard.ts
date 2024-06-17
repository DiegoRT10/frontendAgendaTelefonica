import { CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole']

  const token = localStorage.getItem('token');
  let decodeToken: any = {};

  try {
    decodeToken = jwtDecode(token || '');
  } catch (error) {
    console.error('Error decoding token', error);
    router.navigate(['login']);
    return false;
  }

  console.log('rol ', decodeToken.rol);
  console.log('expectedRole ', expectedRole);

  if (!authService.isAuth() || (decodeToken.rol !== expectedRole)) {
    console.log('Rol no autorizado para la vista');
    alert('Rol no autorizado para la vista');
    router.navigate(['login']); // Retorna a login si no lo es
    return false;
  }

  return true;
};

