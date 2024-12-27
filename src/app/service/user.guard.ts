import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService)
  const router = inject(Router)
  const role = authService.getRole()
  const username = authService.getUsername()

  if(role === "USER" && username !== null){
    return true
  }
  
  router.navigate(["/login"])
  return false;
};
