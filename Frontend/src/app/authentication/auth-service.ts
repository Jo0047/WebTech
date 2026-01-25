import {inject, Injectable} from '@angular/core';
import {RegistrationData} from '@models/user-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

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

  handleLogin(email: string | undefined, password: string | undefined):Observable<Object> {

    const body = {email: email, password: password};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/login`,body,{headers: headers})
  }

}
