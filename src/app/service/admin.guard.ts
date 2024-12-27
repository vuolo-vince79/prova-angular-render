import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)
  const role = authService.getRole()
  const username = authService.getUsername()

  if(role === "ADMIN" && username !== null){
    return true
  }
  router.navigate(["/login"])
  return false;
};
