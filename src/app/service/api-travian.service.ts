import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiTravianService {

  apiUrl : string = 'https://cz4.kingdoms.com/api/external.php?action=requestApiKey'

  private data = {
    email: 'vuolo.vince@outlook.com',
    siteName: 'prova-angular-render',
    siteUrl: 'https://prova-angular-render.onrender.com',
    isPublic: true
  };

  constructor(private http : HttpClient) { }

  

  getApiKey() : Observable<any>{
    return this.http.post(this.apiUrl, this.data)
  }
}
