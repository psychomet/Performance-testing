import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvinceComponent } from './province.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProvinceComponent
      },
      {
        path: ':id',
        component: ProvinceComponent
      }
    ]
  },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinceRoutingModule { }
