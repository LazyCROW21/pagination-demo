import { Component, OnInit } from '@angular/core';
import { CarService } from './car-service/car.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Car } from './common/car.type';

type CarResponse = {
  total: number;
  rows: Car[];
}

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation, listAnimation]
})
export class AppComponent implements OnInit {
  cars: Car[] = [];
  page = 1;
  total = 1;
  limit = 10;
  loading = false;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.fetchCars();
  }

  fetchCars() {
    this.loading = true;
    this.carService.getCars((this.page - 1) * this.limit, this.limit).subscribe(data => {
      const dataRespone = <CarResponse>data;
      this.cars = dataRespone.rows;
      this.total = dataRespone.total;
      this.loading = false;
    });
  }

  changePage(nextPage: number) {
    this.page = nextPage;
    this.fetchCars();
  }

  changeLimit(newLimit: number) {
    this.page = Math.ceil(this.page * this.limit / newLimit);
    this.limit = newLimit;
    this.fetchCars();
  }

  getTotalPages() {
    return Math.ceil(this.total / this.limit);
  }

  getLeftPages() {
    const leftPage = [];
    let currentPage = this.page - 1;
    while (currentPage >= 1 && currentPage > (this.page - 5)) {
      leftPage.unshift(currentPage);
      currentPage--;
    }
    return leftPage;
  }
  getRightPages() {
    const rightPage = [];
    let currentPage = this.page + 1;
    while (currentPage <= this.getTotalPages() && currentPage < (this.page + 5)) {
      rightPage.push(currentPage);
      currentPage++;
    }
    return rightPage;
  }
}
