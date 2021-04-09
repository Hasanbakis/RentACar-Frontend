import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,private localStorage:LocalStorageService,
    private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })

  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        this.localStorage.set("token",response.data.token)
        this.setId(loginModel.email);
        this.router.navigateByUrl('/cars');
        setTimeout(()=>{
          window.location.reload()
        },1000)
        

      },responseErorr=>{
        this.toastrService.error(responseErorr.error)
      })
    }
  }
  setId(email:string){
    this.userService.getUserByEmail(email).subscribe(response=>{
      localStorage.setItem('id',(response.data[0].id).toString())
    })
  }

}
