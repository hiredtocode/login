import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { ProductModel } from '../models/models.component';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products!: ProductModel[];
  displayedColumns: string[] = ['id', 'name'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getProducts()
      .pipe(tap((it) => (this.products = it)))
      .subscribe();
  }
}
