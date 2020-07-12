import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {AppService} from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {

  constructor(private token: TokenService,
              private router: Router,
              private app: AppService,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.token.loggedIn()){
      return this.token.loggedIn();
    }else {
      this.router.navigateByUrl('/user/auth/login');
    }
  }

}
