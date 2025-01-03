import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestUrl } from '../enums/http-key';
import { AuthService } from './auth.service';

interface SetupLang{
  token : string,
  lang : string
}

interface SetupTheme{
  token : string,
  isDark : boolean
}

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  private readonly endpointUrl : string = RequestUrl.dbUrl + "/api/set"

  constructor(private http : HttpClient, private authervice : AuthService) { }

  getAllSetup(){
    this.http.get(this.endpointUrl).subscribe({
      next : resp => console.log("risposta ok tutti setup", resp),
      error : err => console.log("errore richiesta setup", err)
    })
  }

  getSetupById(){
    this.http.post(this.endpointUrl, this.authervice.accessToken).subscribe({
      next : resp => console.log("risposta st by id", resp),
      error : err => console.log("vacca madonna impestata", err)
    })
  }

  setLang(body : SetupLang){
    this.http.post(`${this.endpointUrl}/lang`, body).subscribe({
      next : resp => console.log("risposta da /api/set/lang", resp),
      error : err => console.log("errore aggiornamento lingua", err)
    })
  }
}
