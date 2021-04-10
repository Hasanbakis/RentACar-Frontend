import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl='https://localhost:44320/api/payments/';

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add";
   return this.httpClient.post<ResponseModel>(newPath,payment)
  }
}
