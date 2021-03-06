import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded=false;
  imageBasePath = environment.baseUrl
  defaultImg="logo.jpg" 
  color : string;
  
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsByBrandAndColorId(params["brandId"],params["colorId"])
      }else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else{
        this.getCars()

      }
    })
    
  }
 
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded=true;
    })
  }
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{

      this.cars = response.data
      
      this.dataLoaded=true;
    })
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars= response.data
      this.dataLoaded=true;
    })
  }

  getCarsByBrandAndColorId(brandId:number,colorId:number){
    this.carService.getCarsByBrandAndColorId(brandId,colorId)
    .subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded=true
      if(this.cars.length==0){
        this.toastrService.info("Araç bulunmamaktadır","Sonuç")
      }
    })
  }



}
