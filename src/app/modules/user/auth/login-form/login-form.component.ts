import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../core/services/app.service';
import {ApiService} from '../../../../core/services/api.service';
import {Router} from '@angular/router';
import {UserService} from '../../../../core/services/user.service';
import {AuthService} from '../../../../core/services/auth.service';
import {TokenService} from '../../../../core/services/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  hide = true;
  isLoading: boolean;
  public form = {
    mobile_number:null,
    password: null
  };
  constructor(
    private appService: AppService,
    private apiService: ApiService,
    private tokenService: TokenService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {
    appService.loadingStatus.subscribe(value => this.isLoading = value);
  }

  ngOnInit(): void {}
  onSubmit(){
    this.appService.nextLoading(true);
    this.apiService.getLogin(this.form).subscribe(
      res => this.handleRes(res),
      err => this.handleErr(err)
    )
  }
  handleRes(res){
    this.appService.handleResponse(res.message);
    this.tokenService.handle(res.data.token);
    this.apiService.getProfile().subscribe(res => this.handleResProfile(res))
  }

  handleResProfile(res){
    this.appService.nextLoading(false);
    this.userService.setUser(res);
    this.authService.changeAuthStatus(true);
    // this.userService.nextUser(this.user.getUser());
    this.router.navigateByUrl('/');
  }

  handleErr(err){
    this.appService.nextLoading(false);
    console.log(err.error);
    this.appService.handleError(err.error.message);
  }

}
