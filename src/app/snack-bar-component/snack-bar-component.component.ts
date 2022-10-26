import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-component',
  templateUrl: './snack-bar-component.component.html',
  styleUrls: ['./snack-bar-component.component.scss'],
  styles: [
    `
      .example-pizza-party {
        color: hotpink;
      }
    `,
  ],
})
export class SnackBarComponentComponent implements OnInit {
  durationInSeconds = 3;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponentComponent, {
      duration: this.durationInSeconds * 300,
    });
  }
}
