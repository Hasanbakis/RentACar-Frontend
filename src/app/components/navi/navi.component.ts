import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  users:User[];
  user:User;
  isAuthenticated: boolean;
 

  constructor(private authService:AuthService,
    private localStorage:LocalStorageService,
    private toastrService:ToastrService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if(this.isAuthenticated){
      this.getUserById();
    }
  }

 
  logout(){
    this.localStorage.clear()
    this.toastrService.info("Çıkış işlemi başarılı","Başarılı")
    this.router.navigateByUrl('/cars');
    
  }

  getUserById(){
    this.userService.getUserById(Number(this.localStorage.get("id"))).subscribe(response=>{
      this.users = response.data
      console.log(response)
    })
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(response=>{
      this.users = response.data
      console.log(response.data)
    })
  }



}
