import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListReponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = 'https://localhost:44320/api/brands/getall';

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListReponseModel<Brand>>{
    return this.httpClient.get<ListReponseModel<Brand>>(this.apiUrl);
  }
}
