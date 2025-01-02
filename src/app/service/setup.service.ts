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

  constructor(private http : HttpClient) { }

  setLang(body : SetupLang){
    this.http.post(`${this.endpointUrl}/lang`, body).subscribe({
      next : resp => console.log("risposta da /api/set/lang", resp),
      error : err => console.log("errore aggiornamento lingua", err)
    })
  }
}
