import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TokenService} from './token.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URI = 'https://channel.jarro.ir/api';

  constructor(
    private http: HttpClient,
    private token: TokenService
  ) { }

  private createHeader(){
    let token = this.token.get();
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getLogin(data){
    let requestURL:string = `${this.API_URI}/login`;
    return this.http.post(requestURL,data,{headers: new HttpHeaders({'Accept': 'application/json'})});
  }
  getProfile(){
    let requestURL:string = `${this.API_URI}/v1/user/profile`;
    return this.http.get<User>(requestURL,{headers:this.createHeader()});
  }
  saveProvince(data){
    let requestURL:string = `${this.API_URI}/v1/province`;
    return this.http.post(requestURL,data,{headers:this.createHeader()});
  }
  updateProvince(id,data){
    let requestURL:string = `${this.API_URI}/v1/province/${id}`;
    return this.http.put(requestURL,data,{headers:this.createHeader()});
  }
  findOneProvince(id){
    let requestURL:string = `${this.API_URI}/v1/province/${id}`;
    return this.http.get(requestURL,{headers:this.createHeader()});
  }
  findAllProvince(page?: number) {
    return this.http.get(`${this.API_URI}/v1/province`, {
      params: new HttpParams().set('page', String(page)), headers: this.createHeader()
    })
  }

}
