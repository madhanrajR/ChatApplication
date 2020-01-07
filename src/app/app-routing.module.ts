import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { ChatGuard } from './chat/chat.guard';
import { LoginGuard } from './chat/login.guard';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [LoginGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [ChatGuard]
  },
  {
    path: '**',
    redirectTo: 'chat'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
