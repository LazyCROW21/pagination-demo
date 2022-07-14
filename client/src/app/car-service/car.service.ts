import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {


  baseURL = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  getCars(offset: number, limit: number) {
    return this.http.get(this.baseURL + '/cars', {
      params: { offset, limit }
    });
  }
}
