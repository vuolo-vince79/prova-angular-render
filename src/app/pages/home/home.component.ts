import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ApiTravianService } from '../../service/api-travian.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { SetupService } from '../../service/setup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string | null = this.authService.username

  constructor(private authService: AuthService,
    private tkApiService: ApiTravianService,
    private setupService : SetupService,
    private router: Router) { }

  ngOnInit(): void {
    this.tkApiService.getApiKey().subscribe({
      next: resp => {
        console.log(resp)
        const strToJson = JSON.parse(resp.message)
        console.log(strToJson)
      },
      error: err => console.error("errore api key", err)
    })
  }

  setLang(){
    this.setupService.setLang({token : this.authService.accessToken, lang : "en"})
  }

  getAllSetup(){
    this.setupService.getAllSetup()
  }

  getSetupById(){
    this.setupService.getSetupById()
  }


  logout() {
    this.authService.logout()
  }

}
