import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService =  inject(AuthService);
  const router = inject(Router);
  
  return authService.isLoggedIn()
    ? router.createUrlTree(['/dashboard'])
    : true;
};