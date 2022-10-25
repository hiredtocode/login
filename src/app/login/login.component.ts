import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string | undefined;
  password: string | undefined;
  register_email: string | undefined;
  register_password: string | undefined;
  confirm_password: string | undefined;

  constructor() {}

  ngOnInit(): void {
    // this.loginForm = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(6),
    //   ]),
    // });
  }

  login() {}
  register() {}
}
