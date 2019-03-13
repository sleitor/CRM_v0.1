import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) {
  }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category');
  }

  getById(id): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`);
  }

  create(name, image): Observable<Category> {
    const fd = new FormData();

    fd.append('name', name);

    if (image) {
      fd.append('image', image);
    }

    return this.http.post<Category>('/api/category', fd);
  }

  update(id, name, image): Observable<Category> {
    const fd = new FormData();

    fd.append('name', name);

    if (image) {
      fd.append('image', image);
    }

    return this.http.patch<Category>(`/api/category/${id}`, fd);
  }
}
