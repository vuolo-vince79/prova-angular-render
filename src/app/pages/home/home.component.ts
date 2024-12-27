import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  username : string | null = this.authService.username

  constructor(private authService : AuthService){}
  
    logout(){
      this.authService.logout()
    }

}
