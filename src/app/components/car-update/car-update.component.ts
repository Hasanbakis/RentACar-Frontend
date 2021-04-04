import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm:FormGroup;
  car:Car

  brands:Brand[];
  colors:Color[];

  constructor(private formBuilder:FormBuilder,private brandService:BrandService,private colorService:ColorService,
    private carService:CarService,private toastrService:ToastrService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
      }
    })
    

  }
  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands=response.data
    })
  }



  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    })
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      colorId:["",Validators.required],
      brandId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      carName:["",Validators.required]
    })
  }

  updateCar(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value)
      carModel.carId =this.car.carId;
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message)
      },responseError=>{
        this.toastrService.success(responseError.message)
      })
    }else{
      this.toastrService.error("Form eksik","Hata");
    }
  }

  getCarDetail(carId:number){
    console.log(carId);
    this.carService.getCarDetail(carId).subscribe((response)=>{
      this.car = response.data;
      console.log(response.data);
      this.carUpdateForm.patchValue({
        colorId : this.car.colorId, 
        brandId: this.car.brandId,
        modelYear : this.car.modelYear,
        dailyPrice:this.car.dailyPrice,
        description:this.car.description,
        carName:this.car.carName
        
      })
    })
    
  }

}
