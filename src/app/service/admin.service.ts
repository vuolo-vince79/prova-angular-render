import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly url : string = "https://login-pr.up.railway.app"
  

  constructor(private http : HttpClient) { }

  getAllUsers() : Observable<any>{
    const token : string = sessionStorage.getItem("accessToken") || ""
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    })
    return this.http.get(`${this.url}/api/admin`, {headers})
  }
}
