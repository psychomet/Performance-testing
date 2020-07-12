import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/interfaces/user';
import {UserService} from '../../core/services/user.service';
import {ApiService} from '../../core/services/api.service';
import {AppService} from '../../core/services/app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: User;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    public appService: AppService
  ) {
    userService.getUser().subscribe(value => this.user = value);
  }

  ngOnInit(): void {
    this.apiService.getProfile().subscribe(
      res => this.handleRes(res),
      err => this.handleErr(err)
    );
  }
  handleErr(err){
    console.log(err.error);
    this.appService.handleError(err.error.message);
  }
  handleRes(res){
    this.userService.setUser(res);
  }
}
