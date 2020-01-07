import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {
  constructor(readonly auth: AuthService, readonly router: Router) {}

  canActivate() {
    console.log(this.auth.authentication());
    
    if (!this.auth.authentication()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
