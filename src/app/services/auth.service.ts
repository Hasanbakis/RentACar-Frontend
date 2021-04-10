import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';


import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/User';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44320/api/auth/';

  constructor(private httClient: HttpClient,private localStorageService:LocalStorageService) {}

  login(loginModel: LoginModel):Observable<SingleResponseModel<TokenModel>>{
    //user
    return this.httClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'login', loginModel);
  }

  register(user:User):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl +"register";
    return this.httClient.post<SingleResponseModel<User>>(newPath,user)
    
  }

  isAuthenticated() {
    if (this.localStorageService.get('token')) {
      return true;
    } else {
      return false;
    }
  }
}
