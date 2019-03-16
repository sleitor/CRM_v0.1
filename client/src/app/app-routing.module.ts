import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { CategoryFormComponent } from './category-page/category-form/category-form.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CategoriesPageComponent } from './order-page/categories-page/categories-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { PositionsPageComponent } from './order-page/positions-page/positions-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [
      { path: 'overview', component: OverviewPageComponent },
      { path: 'analytics', component: AnalyticsPageComponent },
      { path: 'history', component: HistoryPageComponent },
      {
        path: 'order', component: OrderPageComponent, children: [
          { path: '', component: CategoriesPageComponent },
          { path: ':id', component: PositionsPageComponent },
        ],
      },
      { path: 'category', component: CategoryPageComponent },
      { path: 'category/new', component: CategoryFormComponent },
      { path: 'category/:id', component: CategoryFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
