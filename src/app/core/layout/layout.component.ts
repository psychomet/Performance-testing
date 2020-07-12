import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {User} from '../../shared/interfaces/user';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';
import {AppService} from '../services/app.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  isScroll: boolean;
  public loggedIn : boolean;
  public me: User;
  mobileQuery: MediaQueryList;

  ngOnInit(): void {}

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private authService: AuthService,
              private userService: UserService,
              private tokenService: TokenService,
              public appService: AppService,
              private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    authService.authStatus.subscribe(value => {
      this.loggedIn = value;
      if (value)
        userService.getUser().subscribe(value => this.me = value);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.userService.deleteUser();
    this.tokenService.remove();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('/user/auth/login');
  }

}
