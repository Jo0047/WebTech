import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthResponse, RegistrationData} from '@models/user-data';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  apiUrl: string = 'http://localhost:3000/auth';

  private _isAuthenticated: boolean = false;
  private _currentUser: AuthResponse | null = null;

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        this._currentUser = JSON.parse(storedUser);
        this._isAuthenticated = true;
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }

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

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`,body,{headers: headers,withCredentials: true}).pipe(
      tap(res => {
        this._isAuthenticated = true;   //Capture Response from login and store it locally (email/isOwner)
        this._currentUser = res;
        localStorage.setItem('user', JSON.stringify(res));
      })
    )
  }

  logout() {
    this._isAuthenticated = false;
    this._currentUser = null;
    localStorage.removeItem('user');
  }

  resetPassword(){
    //todo send email
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  getCurrentUser(): AuthResponse | null {
    return this._currentUser;
  }

  isOwner(): boolean {
    return this._currentUser?.isOwner || false;
  }

  getEmail(): string | null {
    return this._currentUser?.email || null;
  }
}
