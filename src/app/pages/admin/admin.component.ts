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
  userCount : number = 1
  spinner : boolean = false

  constructor(private authService : AuthService, private adminService : AdminService){}

  getAllUsers(){
    this.spinner = true
    this.adminService.getAllUsers().subscribe({
      next : (resp) => {
        this.userCount = resp.length
        console.log("success", this.userCount, resp)
        this.spinner = false
      },
      error : (err) => {
        console.log("error", err)
        this.spinner = false
      }
    })
  }

  getUserById(){
    this.spinner = true
    const userId = Math.floor(Math.random() * this.userCount) + 1
    this.adminService.getUserById(userId).subscribe({
      next : (resp) => {
        console.log("user trovato", resp)
        this.spinner = false
      },
      error : (err) => {
        console.log(err)
        this.spinner = false
      }
    })
  }

  logout(){
    this.authService.logout()
  }

}
