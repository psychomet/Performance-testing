import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {decode, encode} from "punycode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  handle(token) {
    this.set(token);
  }

  set(token) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', encode(token));
    }
  }

  get() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      return token ? decode(token) : token;
    }
    return false;
  }

  remove() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
    }
  }

  isValid(){
    const token = this.get();
    // if (token) {
    //   const payload = this.payload(token);
    //   if (payload) {
    //     return Object.values(this.iss).indexOf(payload.iss) > -1 ? false : true;
    //   }
    // }
    // return false;
    if (token) {
      const payload = this.payload(token);
      if (payload.aud == '1') {
        return true;
      }else {
        return false;
      }
    }
    return false;

  }

  // getRole(){
  //   const token = this.get();
  //   if (token){
  //     const payload = this.payload(token);
  //     return payload.roles;
  //   }
  // }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
