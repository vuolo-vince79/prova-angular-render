import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url : string = "https://login-pr.up.railway.app"
  private sessionRole : string | null = sessionStorage.getItem("role") || null
  private sessionUsername : string | null = sessionStorage.getItem("username") || null
  private role : BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.sessionRole)
  private username : BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.sessionUsername)

  constructor(private http : HttpClient, private router : Router) { }

  getRole() : string | null{
    return this.role.getValue()
  }

  setRole(role : string | null) : void{
    this.role.next(role)
  }

  getUsername() : string | null{
    return this.username.getValue()
  }

  setUsername(username : string | null) : void{
    this.username.next(username)
  }

  login(body : FormGroup) : Observable<any>{
    return this.http.post(`${this.url}/login`, body.value)
  }

  isAuthenticated(role : string) : boolean{
    return this.getRole() === role && this.getUsername() !== null
  }

  register(body : FormGroup) : Observable<any>{
    return this.http.post(`${this.url}/register`, body.value)
  }

  logout() : void{
    this.setRole(null)
    this.setUsername(null)
    sessionStorage.clear()
    this.router.navigate(["/login"])
  }
}
