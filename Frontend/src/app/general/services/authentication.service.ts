import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthResponse, RegistrationData} from '@models/user-data';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  apiUrl: string = 'http://localhost:3000/auth';

  constructor() {}

  register(registrationData: RegistrationData):Observable<Object> {

    const body = registrationData.toJSONString();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/register`,body,{headers: headers})
  }

  handleLogin(email: string | undefined, password: string | undefined):Observable<AuthResponse> {

    const body = {email: email, password: password};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`,body,{headers: headers})
  }

  resetPassword(){
    //todo send email
  }
}
