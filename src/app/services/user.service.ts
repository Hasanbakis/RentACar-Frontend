import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListReponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44320/api/users/';
  constructor(private httpClient:HttpClient) { }


  update(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",user)
  }

  getAllUsers():Observable<ListReponseModel<User>>{
    return this.httpClient.get<ListReponseModel<User>>(this.apiUrl+"getall")
  }

  getUserById(id:number):Observable<ListReponseModel<User>>{
    let newPath=this.apiUrl+ "getbyid?id="+id
    return this.httpClient.get<ListReponseModel<User>>(newPath);
  }

  getUserByEmail(email:string):Observable<ListReponseModel<User>>{
    let newPath = this.apiUrl + "getbyemail?email="+email
    return this.httpClient.get<ListReponseModel<User>>(newPath);
  }
}
