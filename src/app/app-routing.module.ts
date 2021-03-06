import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/details/:carId",component:CardetailComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent,pathMatch:"full"},
  {path:"rental/:carId",component:RentalComponent},
  {path:"payment/:rental",component:PaymentComponent},

  {path:"color/add",component:ColorListComponent,canActivate:[LoginGuard]},
  {path:"brand/add",component:BrandListComponent,canActivate:[LoginGuard]},

  {path:"car/add", component:CarAddComponent},
  {path:"car/update/:carId",component:CarUpdateComponent},
  {path:"carlist",component:CarListComponent,canActivate:[LoginGuard]},

  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},

  {path:"updateuser",component:UserUpdateComponent}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
