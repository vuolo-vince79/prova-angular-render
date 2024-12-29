import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiTravianService {

  private readonly apiUrl : string = "https://login-pr.up.railway.app"
  private readonly tkUrl : string = "https://com1.kingdoms.com"

  constructor(private http : HttpClient) { }


  getApiKey() : Observable<any>{
    return this.http.post(`${this.apiUrl}/travian`, this.tkUrl)
  }
}
