import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators} from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Card } from 'src/app/models/card';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CardService } from 'src/app/services/card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
  rental:Rental;
  car:Car;
  amount:number; //test
  

  cardId:number;
  cardNumber:string;
  nameOnTheCard:string;
  expirationDate:string;
  cvv:number;

  creditCardAddForm: FormGroup;
  creditCards:Card[]=[];
  


  constructor(private formBuilder:FormBuilder,
    private paymentService:PaymentService,
    private toastrService:ToastrService,
    private rentalService:RentalService,
    private cardService:CardService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { 
   
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['rental']){
        this.rental = JSON.parse(params['rental']);
        this.getCardByCustomer();
       
      }
    })
    this.createCreditCardForm();
    
  }

  createCreditCardForm(){
    this.creditCardAddForm =this.formBuilder.group({  
      customerCards:["",Validators.required],
      cardNumber:["",Validators.required],
      nameOnTheCard:["",Validators.required],
      expirationDate:["",Validators.required],
      cvv:["",Validators.required]

    });
  }

  saveCard(){
    let cardModel:Card ={
      cardNumber:this.cardNumber,
      nameOnTheCard:this.nameOnTheCard,
      expirationDate:this.expirationDate,
      cvv:this.cvv,
      customerId:this.rental.customerId,
    }
    this.cardService.add(cardModel).subscribe(response=>{
      this.toastrService.success(response.message,"Card saved");
      this.payment();
      
    },responseError=>{
      this.toastrService.error(responseError.error.message,"card error")
    })
  }  

  getCardByCustomer(){
    this.cardService.getByCustomerId(this.rental.customerId).subscribe(response=>{
      this.creditCards = response.data;
      this.creditCards.forEach(response=>{
        this.cardNumber = response.cardNumber,
        this.nameOnTheCard=response.nameOnTheCard,
        this.expirationDate=response.expirationDate,
        this.cvv = response.cvv
      });
    })
  }

  setCardInfos(){
    this.creditCardAddForm.patchValue({
      cardNumber:this.cardNumber,
      nameOnTheCard:this.nameOnTheCard,
      expirationDate:this.expirationDate,
      cvv:this.cvv
    });
  }

 

  payment(){
    let paymentModel:Payment ={
      amount :this.amount
    }
    console.log("paymenta girdimi");
    this.paymentService.addPayment(paymentModel).subscribe(response=>{
      this.toastrService.success("paid")
    },responseError=>{
      this.toastrService.error(responseError.erorr)
    })
  }
}
