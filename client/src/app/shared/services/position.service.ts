import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PositionService {

  constructor(
    private http: HttpClient,
  ) {
  }

  fetch(categoryId): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`);
  }
}