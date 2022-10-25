import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  registerForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['12r12r@mail.com', Validators.required],
      password: ['asdf', Validators.required],
    });

    if (this.authService.isLoggedIn$) {
      this.router.navigate(['dashboard']);
    }
  }
  onLogin() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.login(this.registerForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        console.log(error?.error.message);
      },
    });
  }

  submitForm() {}
}
