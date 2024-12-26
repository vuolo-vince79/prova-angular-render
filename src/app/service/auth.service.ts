import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url : string = "https://login-pr.up.railway.app"

  constructor(private http : HttpClient) { }

  login(body : FormGroup) : Observable<any>{
    return this.http.post(`${this.url}/login`, body.value)
  }

  register(body : FormGroup) : Observable<any>{
    return this.http.post(`${this.url}/register`, body.value)
  }
}
