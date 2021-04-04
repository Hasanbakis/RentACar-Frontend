import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetails';
import { CarService } from 'src/app/services/car.service';
import { CardetailService } from 'src/app/services/cardetail.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  car:Car;
  carDetail:CarDetail;
  imageBasePath = environment.baseUrl;
  defaultImg="logo.jpg"

  constructor(private carDetailService:CardetailService,private carService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"]);
        
      }
    })  
  }

  getCarDetail(carId:number){
    this.carDetailService.getCarDetail(carId).subscribe((response)=>{
      this.car = response.data;
    })
  }

}
