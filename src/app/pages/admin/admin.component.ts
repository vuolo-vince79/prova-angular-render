import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent{

  username : string | null = this.authService.getUsername()

  constructor(private authService : AuthService, private adminService : AdminService){}

  getAllUsers(){
    this.adminService.getAllUsers().subscribe({
      next : (resp) => console.log("success", resp),
      error : (err) => console.log("error", err)
    })
  }

  logout(){
    this.authService.logout()
  }

}
