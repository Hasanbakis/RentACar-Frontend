import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListReponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl='https://localhost:44320/api/cars/';

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListReponseModel<Car>>{
    let newPath = this.apiUrl + "getallcardetails";
    return this.httpClient.get<ListReponseModel<Car>>(newPath);
  }
  getAllCarDetails():Observable<ListReponseModel<Car>>{
    let newPath = this.apiUrl + "getallcardetails"
    return this.httpClient.get<ListReponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListReponseModel<Car>>{
    let newPath = this.apiUrl + "getallcardetailsbybrand?brandId=" + brandId
    return this.httpClient.get<ListReponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListReponseModel<Car>>{
    let newPath = this.apiUrl + "getallcardetailsbycolor?colorId=" + colorId
    return this.httpClient.get<ListReponseModel<Car>>(newPath);
  }

  getCarDetail(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "getcardetail?carId="+ carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }

  getCarsByBrandAndColorId(brandId:number,colorId:number):Observable<ListReponseModel<Car>>{
    let newPath = this.apiUrl + `getcarsbybrandidcolorid?brandId=${brandId}&colorid=${colorId}`;
    return this.httpClient.get<ListReponseModel<Car>>(newPath);
  }
 

  add(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }

  delete(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }



}
