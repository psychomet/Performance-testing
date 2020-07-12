import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginFormComponent} from './login-form/login-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginFormComponent,
    data: {
      breadcrumb: 'ورود'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
