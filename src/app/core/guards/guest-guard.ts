import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const guestGuard: CanActivateFn = async () => {
  const authService = inject(Auth);
  const router = inject(Router);

  const isAuth = await authService.waitForAuth();

  if (!isAuth) {
    return true;
  }

  router.navigate(['/tabs/dashboard']);
  return false;
};
