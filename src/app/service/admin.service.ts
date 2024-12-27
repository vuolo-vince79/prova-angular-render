import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly url : string = "https://login-pr.up.railway.app"
  private readonly token : string = sessionStorage.getItem("accessToken") || ""

  constructor(private http : HttpClient) { }

  getAllUsers() : Observable<any>{
    return this.http.get(`${this.url}/api/admin`)
  }
}
