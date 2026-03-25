import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const tokenPayload = authService.getTokenPayload();

  if (!tokenPayload) {
    return router.createUrlTree(['/login']);
  }

  const expectedRole = route.data?.['role'];

  // ✅ allow if role matches
  if (tokenPayload.role === expectedRole) {
    return true;
  }

  if (tokenPayload.role === 'admin') {
    return router.createUrlTree(['/dashboard']);
  } else {
    return router.createUrlTree(['/user-dashboard']);
  }
};
