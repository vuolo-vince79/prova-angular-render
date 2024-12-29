import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ApiTravianService } from '../../service/api-travian.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  username : string | null = this.authService.username

  constructor(private authService : AuthService, 
    private tkApiService : ApiTravianService,
    private router : Router){}

  ngOnInit(): void {
      this.tkApiService.getApiKey().subscribe({
        next : resp => {
          console.log(resp)
          const strToJson = JSON.parse(resp.message)
          console.log(strToJson)
        },
        error : err => console.error("errore api key", err)
      })
  }
  
    logout(){
      this.authService.logout().subscribe({
        next : resp => {
          console.log(resp)
          this.authService.role = null
          this.authService.username = null
          sessionStorage.clear()
          this.router.navigate(["/login"])
        },
        error : err => console.log("errore logout", err)
      })
    }

}
