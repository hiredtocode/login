import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: new FormControl('', Validators.compose([Validators.email])),
        nickname: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(6)])
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(4)])
        ),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(4)])
        ),
      },
      {
        validators: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  onRegister() {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('response', response.message);
        this.registerForm.reset();
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.log('error', error.message);
      },
    });
  }
  cancel() {
    this.router.navigate(['dashboard']);
  }

  get error() {
    return this.registerForm.controls;
  }

  mustMatch(password: any, confirmPassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['mustMatch']
      ) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}
