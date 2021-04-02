import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payForm: FormGroup;
  rental:Rental;
  constructor(private formBuilder:FormBuilder,private paymentService:PaymentService,private toastrService:ToastrService,private rentalService:RentalService) { 
    // this.rentalService.rental.subscribe(
    //   (gelenRent)=>{
    //     console.log(gelenRent);
    //     this.rental=gelenRent;
    //   }
    // )
  }

  ngOnInit(): void {
    
    this.createPayForm();

  }

  createPayForm(){
    
    this.payForm =this.formBuilder.group({
      cardNumber:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      expirationDate:["",Validators.required],
      cVV:["",Validators.required]


    });

  }

  pay(){

    if(this.payForm.valid){
      let payment =Object.assign({},this.payForm.value)
      this.paymentService.addPayment(payment).subscribe(response=>{
        this.toastrService.success(response.message,"İşlem Tamamlandı")
        
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i <responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası")  
          }
        }
      })
     
    }else{
      this.toastrService.error("Ödenemedi","Hata")

    }
   
    
  }

}
