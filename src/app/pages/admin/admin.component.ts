import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

interface User{
  idUser : number,
  username : string,
  email : string,
  psw : string
  ruolo : string,
  refreshToken : string
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  username : string | null = this.authService.username
  userCount : number = 5
  spinner : boolean = false
  users : User[] = []
  showUsers : boolean = false

  constructor(private authService : AuthService, 
    private adminService : AdminService,
    private router : Router){}

  ngOnInit(): void {
    this.spinner = true
    this.adminService.getAllUsers().subscribe({
      next : (resp : User[]) => {
        this.users = resp.sort((a, b) => a.idUser - b.idUser)
        this.spinner = false
      },
      error : (err) => {
        console.log("errore reperimento dati", err)
      }
    })
  }

  getAllUsers(){
    this.showUsers = true
  }

  getUserById(){
    this.spinner = true
    // const userId = Math.floor(Math.random() * this.userCount) + 1
    this.adminService.getUserById(this.userCount).subscribe({
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
