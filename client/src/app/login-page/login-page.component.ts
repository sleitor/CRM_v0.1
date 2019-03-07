import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    this.form.disable();
    console.log('Submit', this.form.value);
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => console.log('Login success'),
      error => {
        console.warn('Error', error);
        this.form.enable();
      },
    );
  }

  ngOnDestroy(): void {
    if (this.aSub) this.aSub.unsubscribe();
  }
}
