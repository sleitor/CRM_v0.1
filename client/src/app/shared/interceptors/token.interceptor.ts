import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {'Authorization': this.auth.getToken()}
      });
    }
    return next.handle(req).pipe(
      catchError(err => this.handleError(err))
    );
  }

  handleError(error) {
    if (error.status === 401) {
      this.router.navigate(['/login'], {queryParams: {brokenSession: true}}).then()
    }

    return throwError(error)
  }
}
