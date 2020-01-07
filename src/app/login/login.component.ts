import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error: string;

  constructor(public router: Router, public auth: AuthService) {}

  login(userId: string,password: string) {
    console.log(userId);
    
    this.auth
      .login(userId,password)
      .then(
        () => this.router.navigateByUrl('/chat'),
        err => (this.error = err)
      );
  }
}
