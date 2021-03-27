import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListReponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
 
@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl ='https://localhost:44320/api/';

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListReponseModel<Rental>>
  {
    let newPath = this.apiUrl+"rentals/getallrentaldetails";
    return this.httpClient.get<ListReponseModel<Rental>>(newPath)
  }
  
  addRental(rental:Rental):Observable<ResponseModel>
  {
    let newPath = this.apiUrl+"rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,{rental:rental})
  }
}
