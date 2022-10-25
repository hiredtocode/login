import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

const SAMPLE_TEXT =
  'Irure minim excepteur dolore laboris labore qui sint qui consequat. Qui aute qui ad cupidatat id enim enim mollit adipisicing fugiat non dolore nisi amet. Ad deserunt nulla enim ad quis.';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  postForm!: FormGroup;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.postForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      longDescription: [
        SAMPLE_TEXT,
        [Validators.required, Validators.minLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
    });
  }

  onPost() {
    this.authService.post();
  }
}
