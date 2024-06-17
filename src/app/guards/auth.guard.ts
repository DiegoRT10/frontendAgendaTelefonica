import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuth()) {
    console.log('Su inicio de sesión no es válido o ya expiró');
    alert('Su inicio de sesión no es válido o ya expiró');
    router.navigate(['login']);
    return false;
  }

  return true;
};
