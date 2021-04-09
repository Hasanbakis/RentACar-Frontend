import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ListReponseModel } from 'src/app/models/listResponseModel';
import { User } from 'src/app/models/User';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userUpdateForm:FormGroup
  user:User
  users:User[]=[];

  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,
    private userService:UserService,private activatedRoute:ActivatedRoute,
    private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    if(this.localStorage.get("id")){
      this.getUserById(Number(this.localStorage.get("id")))
    }
    this.createUserUpdateForm();
    this.getUsers();
    
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(response=>{
      this.users = response.data
    })
  }
  
  createUserUpdateForm(){
    this.userUpdateForm=this.formBuilder.group({
      id:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })

  }

  update(){
    if(this.userUpdateForm.valid){
      let userModel = Object.assign({},this.userUpdateForm.value)
      this.userService.update(userModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      })
    }else{
      this.toastrService.error("Formumuz eksik","Dikkat")
    }
  }
  getUserById(id:number){
    this.userService.getUserById(id).subscribe(response=>{
      this.user = response.data[0];
    })
  }

  informations(){
    this.userUpdateForm.patchValue({
      id:this.user.id,
      firstName:this.user.firstName,
      lastName:this.user.lastName,
      email:this.user.email,
      password:this.user.passwrod

    })
  }

}
