import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = null;

  constructor(private http: HttpClient) {
  }

  register() {

  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('token', token);
          this.setToken(token);
        })
      )
  }

  setToken(token): void {
    this.token = token;
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.clear();
  }
}
