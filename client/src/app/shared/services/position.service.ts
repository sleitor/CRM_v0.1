import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position, Response } from '../interfaces';

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

  create(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position/', position);
  }

  update(position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${position._id}`, position);
  }

  delete(position: Position): Observable<Response> {
    return this.http.delete<Response>(`/api/position/${position._id}`);
  }
}
