import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { Card } from '../models/card';
import { ListReponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  
  apiUrl="https://localhost:44320/api/cards/"

  constructor(private httpClient:HttpClient) { }

  add(card:Card):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",card)
  }

  update(card:Card):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",card)
  }

  delete(card:Card):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete",card)

  }

  getByCustomerId(id:number):Observable<ListReponseModel<Card>>{
    return this.httpClient.get<ListReponseModel<Card>>(this.apiUrl+"getbycustomer?id="+id)
  }
}
