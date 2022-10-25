import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl, postUrl } from '../environments/environment';
import { PostComponent } from './post/post.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_NAME = 'token';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  register(userObj: any) {
    return this.http.post<any>(`${baseUrl}register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${baseUrl}login`, loginObj).pipe(
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

  submit(postObj: any) {
    let token = localStorage.getItem(this.TOKEN_NAME);
    let head_obj = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let result = this.http.post<any>(`${postUrl}posts`, postObj, {
      headers: head_obj,
    });
    this.router.navigate(['post']);
    return result;
  }
}
