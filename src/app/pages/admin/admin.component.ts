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
  displayedUsers : User[] = []
  currentPage : number = 1
  rowsPerPage : number = 2
  totalRecords : number = 0
  totalPages : number = 0
  showUsers : boolean = false

  constructor(private authService : AuthService, 
    private adminService : AdminService,
    private router : Router){}

  ngOnInit(): void {
    this.spinner = true
    this.adminService.getAllUsers().subscribe({
      next : (resp : User[]) => {
        this.users = resp.sort((a, b) => a.idUser - b.idUser)
        this.totalRecords = resp.length
        this.totalPages = Math.ceil(resp.length / this.rowsPerPage)
        this.setDisplayedUsers()
        this.spinner = false
      },
      error : (err) => {
        console.log("errore reperimento dati", err)
      }
    })
  }

  prevPage(){
    if(this.currentPage - 1 >= 1){
      this.currentPage--
      this.setDisplayedUsers()
    }
  }

  nextPage(){
    if(this.currentPage + 1 <= this.totalPages){
      this.currentPage++
      this.setDisplayedUsers()
    }
  }

  getAllUsers(){
    this.showUsers = true
  }

  setDisplayedUsers(){
    const startIndex = (this.currentPage - 1) * this.rowsPerPage
    const endIndex = startIndex + this.rowsPerPage
    this.displayedUsers = this.users.slice(startIndex, endIndex)
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
