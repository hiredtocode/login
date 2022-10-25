import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    // @inject(MAT_DIALOG_DATA) public data: any,
    private login: LoginComponent
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
  }

  modalLogin() {
    this.login.onLogin();
  }
}
