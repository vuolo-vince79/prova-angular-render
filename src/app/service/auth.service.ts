import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url : string = "https://login-pr.up.railway.app"
  private role : BehaviorSubject<string> = new BehaviorSubject<string>("")
  private username : BehaviorSubject<string> = new BehaviorSubject<string>("")

  constructor(private http : HttpClient) { }

  setRole(role : string){
    this.role.next(role)
  }

  setUsername(username : string){
    this.username.next(username)
  }

  login(body : FormGroup) : Observable<any>{
    return this.http.post(`${this.url}/login`, body.value)
  }

  register(body : FormGroup) : Observable<any>{
    return this.http.post(`${this.url}/register`, body.value)
  }
}
