import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl='https://localhost:44320/api/';

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment){
    let newPath = this.apiUrl + "payments/add";
    this.httpClient.post(newPath,payment).subscribe();

  }
}
