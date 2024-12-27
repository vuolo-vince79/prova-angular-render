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

  constructor(private authService : AuthService, private adminService : AdminService){}

  getAllUsers(){
    this.adminService.getAllUsers().subscribe({
      next : (resp) => {
        this.userCount = resp.length
        console.log("success", this.userCount, resp)
      },
      error : (err) => console.log("error", err)
    })
  }

  getUserById(){
    const userId = Math.random() * this.userCount + 1
    this.adminService.getUserById(userId).subscribe({
      next : (resp) => console.log("user trovato", resp),
      error : (err) => console.log(err)
    })
  }

  logout(){
    this.authService.logout()
  }

}
