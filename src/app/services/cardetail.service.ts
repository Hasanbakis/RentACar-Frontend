import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListReponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetails';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CardetailService {
  apiUrl='https://localhost:44320/api/';

  constructor(private httpClient:HttpClient) { }

  getCarDetail(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetail?carId=" + carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }
}
