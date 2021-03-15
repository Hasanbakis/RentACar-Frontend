import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListReponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:44320/api/colors/getall';
  constructor(private httpClient:HttpClient ) { }

  getColors():Observable<ListReponseModel<Color>>{
    return this.httpClient.get<ListReponseModel<Color>>(this.apiUrl);
  }
}
