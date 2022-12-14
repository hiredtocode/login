import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  durationInSeconds: number = 3;
  postForm!: FormGroup;
  isAuthenticated: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
    });
  }

  onPost() {
    this.authService.post();
  }
  onSubmit() {
    console.log('onSubmit pressed');
  }
}
