import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient){}

  login(credentials: { email: string; password: string }){
    return this.http.post(`${this.apiUrl}Auth/login`, credentials);
  }

  register(data: any){
    return this.http.post(`${this.apiUrl}Auth/register`, data);
  }
}
