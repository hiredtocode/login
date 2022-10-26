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
      email: new FormControl('', Validators.compose([Validators.email])),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(4)])
      ),
    });
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
  cancel() {
    this.router.navigate(['dashboard']);
  }
}
