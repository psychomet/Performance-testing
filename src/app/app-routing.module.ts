import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './core/layout/layout.component';
import {AfterLoginService} from './core/services/after-login.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/province',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'province',
        loadChildren: () => import('./modules/province/province.module').then(m => m.ProvinceModule),
        canActivate: [AfterLoginService]
      },
      { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
        data:{ breadcrumb: 'ناحیه کاربری' }}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
