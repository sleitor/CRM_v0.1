import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements AfterViewInit {

  @ViewChild('float') floatRef;

  links = [
    { path: '/overview', name: 'Обзор' },
    { path: '/analytics', name: 'Аналитика' },
    { path: '/history', name: 'История' },
    { path: '/order', name: 'Добавить заказ' },
    { path: '/category', name: 'Ассортимент' },
  ];

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {
  }

  ngAfterViewInit(): void {
    MaterialService.floatingActionButton(this.floatRef);
  }

  logout() {
    this.router.navigate(['/login']).then();
    this.auth.logout();
  }
}
