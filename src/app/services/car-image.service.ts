import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListReponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl='https://localhost:44320/api/';
  constructor(private httpClient:HttpClient) { }

  getCarImages(carId:number):Observable<ListReponseModel<CarImage>>{
    let newPath = this.apiUrl + "carImages/getimagesbycarid?carId=" + carId
    return this.httpClient.get<ListReponseModel<CarImage>>(newPath)
     
  }
}
