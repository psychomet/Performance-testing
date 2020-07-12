import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';
import {SharedModule} from '../../shared/shared.module';
import { ProvinceFormComponent } from './province-form/province-form.component';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {getPersianPaginatorIntl} from '../../shared/persian-paginator-intl';


@NgModule({
  declarations: [ProvinceComponent, ProvinceFormComponent],
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    SharedModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl()}
  ]
})
export class ProvinceModule { }
