import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ApiTravianService } from '../../service/api-travian.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  username : string | null = this.authService.username

  constructor(private authService : AuthService, private tkApiService : ApiTravianService){}

  ngOnInit(): void {
      this.tkApiService.getApiKey().subscribe({
        next : resp => {
          const strToJson = JSON.parse(resp)
          console.log(strToJson)
        },
        error : err => console.error("errore api key", err)
      })
  }
  
    logout(){
      this.authService.logout()
    }

}
