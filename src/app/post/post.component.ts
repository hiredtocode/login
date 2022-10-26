import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PostModel } from '../models/models.component';

const SAMPLE_TEXT =
  '안녕하세요, 만나서? 반갑습니다! 오늘도 행복하고 승리하는 하루가 되길 바래요!, 좋은 소식 기다리고 있겠습니다. 감사합니다.';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  postForm!: FormGroup;
  isAuthenticated = false;
  title: string = '';
  content: string = '';
  createdAt: string = '';
  posts: PostModel[] = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.postForm = this.formBuilder.group({
      title: [
        '풀타임 개발자를 꿈꾸며!!',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      content: [SAMPLE_TEXT, [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
      let check = localStorage.getItem('token');
      if (check) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
        this.router.navigate(['dashboard']);
      }
    });
  }

  onSubmit() {
    this.authService.submit(this.postForm.value).subscribe({
      next: (response) => {
        this.title = response.response.title;
        this.content = response.response.content;
        this.createdAt = response.response.createdAt;
        this.postForm.reset();
        this.posts.push(response.response);
      },
      error: (error) => {
        console.log('error', error.message);
      },
    });
  }

  onCancel() {
    this.router.navigate(['dashboard']);
  }
}
