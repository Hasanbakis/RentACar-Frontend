import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListReponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:44320/api/';
  constructor(private httpClient:HttpClient ) { }

  getColors():Observable<ListReponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getall";
    return this.httpClient.get<ListReponseModel<Color>>(newPath);
  }

  addColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/add";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  updateColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/update";
    return this.httpClient.post<ResponseModel>(newPath,color);
  
  }

  deleteColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl +"colors/delete";
    return this.httpClient.post<ResponseModel>(newPath,color)

  }
}
