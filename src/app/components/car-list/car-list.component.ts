import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars :Car[] = [];
  dataLoaded = false;

  constructor(private carService:CarService) {}

  ngOnInit(): void {
    this.getAllCarDetails();

  }

 getAllCarDetails(){
   this.carService.getAllCarDetails().subscribe(response=>{
     this.cars = response.data;
     this.dataLoaded=true;

   })
 }

}
