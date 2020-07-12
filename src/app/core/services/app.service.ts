import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loadingStatus = this.loading.asObservable();
  constructor(
    private snackBar: MatSnackBar,
    private token: TokenService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  // roleMatch(allowedRoles): boolean {
  //   let isMatch = false;
  //   let userRoles: any = this.token.getRole();
  //   allowedRoles.forEach(element => {
  //     if (userRoles.indexOf(element) > -1){
  //       isMatch = true;
  //       return false;
  //     }
  //   });
  //   return isMatch;
  // }
  nextLoading(data: boolean){
    this.loading.next(data);
  }
  convertDate(date,local){
    return new Date(date).toLocaleDateString(local);
  }
  convertDateTime(date){
    return new Date(date).toLocaleDateString('fa-Ir',{year:"2-digit",month:"2-digit", day:"2-digit",hour: '2-digit',minute:'2-digit'});
  }

  handleResponse(data){this.snackBar.open(data, '', {duration: 5000,})}
  handleError(error){this.snackBar.open(error, '', {duration: 5000, panelClass: ['danger-snackbar']})};

}
