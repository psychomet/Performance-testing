import { Injectable } from '@angular/core';
import {User} from "../../shared/interfaces/user";
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: BehaviorSubject<User> = new  BehaviorSubject({});
  userStatus = this.user.asObservable();
  constructor() { }

  setUser(data: User){
    localStorage.setItem('user',JSON.stringify(data));
  }

  // getUser(){
  //   return JSON.parse(localStorage.getItem('user'));
  // }
  getUser(): Observable<User> {
    return of(JSON.parse(localStorage.getItem('user')));
  }


  setUserRole(data){
    localStorage.setItem('roles',data);
  }

  nextUser(data){
    this.user.next(data);
  }


  deleteUser(){
    localStorage.clear();
  }

}
