import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(private auth:AuthService) {}

  ngOnInit() {}

  signupdetails(a,b,c)
  {
  console.log(a,b,c);
  var data={
"email":a,
"username":b,
"password":c
  }
this.auth.signup(data);
  }
}
