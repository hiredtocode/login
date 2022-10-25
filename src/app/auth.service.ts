import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string =
    'http://ec2-3-37-207-126.ap-northeast-2.compute.amazonaws.com:9999/api/users/';

  private readonly TOKEN_NAME = 'token';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private http: HttpClient, private router: Router) {
    this._isLoggedIn$.next(!!this.token);
  }

  register(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}login`, loginObj).pipe(
      tap((response: any) => {
        localStorage.setItem(this.TOKEN_NAME, response.response.access_token);
        this._isLoggedIn$.next(true);
      })
    );
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.clear();
    this.router.navigate(['dashboard']);
  }

  post() {
    let token = localStorage.getItem(this.TOKEN_NAME);
    token === null
      ? this.router.navigate(['login'])
      : this.router.navigate(['post']);
  }
}
