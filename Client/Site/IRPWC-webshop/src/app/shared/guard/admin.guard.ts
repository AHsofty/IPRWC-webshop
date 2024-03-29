import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from "../service/auth.service";

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.isAdmin()) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};
