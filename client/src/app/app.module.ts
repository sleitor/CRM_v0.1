import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { AuthLayoutComponent } from './shared/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoryFormComponent } from './category-page/category-form/category-form.component';
import { PositionFormComponent } from './category-page/category-form/position-form/position-form.component';
import { CategoriesPageComponent } from './order-page/categories-page/categories-page.component';
import { PositionsPageComponent } from './order-page/positions-page/positions-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    CategoryPageComponent,
    OrderPageComponent,
    HistoryPageComponent,
    AnalyticsPageComponent,
    LoaderComponent,
    CategoryFormComponent,
    PositionFormComponent,
    CategoriesPageComponent,
    PositionsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
