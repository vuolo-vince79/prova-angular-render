import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent{

  username : string | null = this.authService.getUsername()

  constructor(private authService : AuthService){}

  logout(){
    this.authService.logout()
  }

}
