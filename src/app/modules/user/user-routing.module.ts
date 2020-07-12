import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import {BeforeLoginService} from '../../core/services/before-login.service';
import {AfterLoginService} from '../../core/services/after-login.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full'
  },
  {
    path: '',
    component: UserComponent,
    canActivate: [AfterLoginService],
    data: {breadcrumb: 'پروفایل'}
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [BeforeLoginService],
    data: {breadcrumb: 'اهراز هویت'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
