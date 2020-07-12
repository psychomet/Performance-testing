import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppService} from './services/app.service';
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {TokenService} from './services/token.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AppService,
    ApiService,
    AuthService,
    UserService,
    TokenService
  ]
})
export class CoreModule { }
