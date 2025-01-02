import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, concatMap, map, Observable, of, throwError } from 'rxjs';
import { RequestUrl } from '../enums/http-key';

interface ApiResponse{
  message : {
    accessToken : string,
    refreshToken : string,
    role : string,
    username : string
  },
  success : boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url : string = RequestUrl.dbUrl
  private readonly accessTokenStorageKey = "accessToken"
  private readonly refreshTokenStorageKey = "refreshToken"
  private readonly roleStorageKey = "role"
  private readonly usernameStorageKey = "username"
  private storageRole : string | null = sessionStorage.getItem(this.roleStorageKey) || null
  private storageUsername : string | null = sessionStorage.getItem(this.usernameStorageKey) || null
  private roleBS : BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.storageRole)
  private usernameBS : BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.storageUsername)

  constructor(private http : HttpClient, private router : Router) { }

  private getSessionStorage(key : string) : string | null{
    return sessionStorage.getItem(key)
  }

  private setSessionStorage(key : string, value : string) : void{
    sessionStorage.setItem(key, value)
  }

  get accessToken() : string{
    return this.getSessionStorage(this.accessTokenStorageKey) || ""
  }

  set accessToken(token : string){
    this.setSessionStorage(this.accessTokenStorageKey, token)
  }

  get refreshToken() : string{
    return this.getSessionStorage(this.refreshTokenStorageKey) || ""
  }

  set refreshToken(token : string){
    this.setSessionStorage(this.refreshTokenStorageKey, token)
  }

  get role() : string | null{
    return this.roleBS.getValue()
  }

  set role(role : string | null){
    this.roleBS.next(role)
    if(role) this.setSessionStorage(this.roleStorageKey, role)
  }

  get username() : string | null{
    return this.usernameBS.getValue()
  }

  set username(username : string | null){
    this.usernameBS.next(username)
    if(username) this.setSessionStorage(this.usernameStorageKey, username)
  }

  login(body : FormGroup) : Observable<any>{
    return this.http.post(`${this.url}/login`, body.value)
  }

  isAuthenticated(role : string) : boolean{
    return this.role === role && this.username !== null
  }

  register(body : FormGroup) : Observable<any>{
    return this.http.post(`${this.url}/register`, body.value)
  }

  refreshAccessToken(refreshToken : string) : Observable<string>{
    return this.http.post<ApiResponse>(`${this.url}/api/auth/refresh`, refreshToken).pipe(
      map(resp => {
        return resp.message.accessToken
      }),
      catchError(err => {
        return throwError(() => new Error("errore nuovo yoken"))
      })
    )
  }

  logout() {
    const username = this.username
    this.http.post(`${this.url}/api/auth/logout`, username).subscribe({
      next : resp => {
        console.log("response", resp)
        this.role = null
        this.username = null
        sessionStorage.clear()
        this.router.navigate(["/login"])
      },
      error : err => {
        console.log("errore logout", err)
        return of(null)
      }}
    )
  }
}
