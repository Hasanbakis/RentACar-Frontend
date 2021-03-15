import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListReponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl='https://localhost:44320/api/';

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListReponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getallcardetails";
    return this.httpClient.get<ListReponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListReponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getallcardetailsbybrand?brandId=" + brandId
    return this.httpClient.get<ListReponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListReponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getallcardetailsbycolor?colorId=" + colorId
    return this.httpClient.get<ListReponseModel<Car>>(newPath);
  }
}
