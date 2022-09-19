import { User } from './../interfaces/user.interface';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user(){
    return { ...this._user };
  }

  constructor( private http: HttpClient) { }

  login( email: string, password: string){

    const url = `${this.baseUrl}auth`;
    const body = { email: email, password: password};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(response => {
          if (response.ok) {
            localStorage.setItem('token', response.token!);
            this._user = {
              name: response.name!,
              uid: response.uid!,
              email: response.email!
            }
          }
        }),
        map(response => response.ok),
        catchError(error => of(error.error.msg))
      );
  }

  register(name: string, email: string, password: string){

    const url = `${this.baseUrl}auth/new`
    const body = { name, email, password };

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(response => {
        if (response.ok) {
          localStorage.setItem('token', response.token!);
        }
      }),
      map(response => response.ok),
      catchError(error => of(error.error.msg))
    );
  }

  validateToken(): Observable<boolean> {
    
    const url = `${this.baseUrl}auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers: headers})
      .pipe(
        map(response => {
          
          if (response.ok) {
            localStorage.setItem('token', response.token!);
            this._user = {
              name: response.name!,
              uid: response.uid!,
              email: response.email!
            }
          }

          return response.ok;
        }),
        catchError(error => of(false))
      );
  }

  logout() {
    localStorage.clear();
  }

}
