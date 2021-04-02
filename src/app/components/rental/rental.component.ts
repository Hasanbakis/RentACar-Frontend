import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';

import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  customers:Customer[];
  customerId:Number;
  rentDate:Date;
  returnDate:Date;
  @Input() car:Car;
  
  constructor(private rentalService:RentalService,private customerService:CustomerService,private activatedRoute:ActivatedRoute,
     private router:Router,private toastrSevice:ToastrService) {}

  ngOnInit(): void {
    this.getCustomers();
   
  }


  getCustomers(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
     
    })
  }
  getMinDate(){
    var today  = new Date();

    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0,10)
  }
  
 
  addRental()
  {
    let rental:Rental =
    {
      rentDate:this.rentDate,
      returnDate:this.returnDate,
      carId:this.car.carId,
      customerId: parseInt(this.customerId.toString())
    }
   
    this.router.navigateByUrl('/payment');
    // this.router.navigate(["/payment/",JSON.stringify(rental)]);
    this.toastrSevice.info("Ödeme sayfasına yönlendiriliyorsunuz.","Ödeme işlemleri")
  }
} 