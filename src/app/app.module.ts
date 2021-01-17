import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { DashboardOverviewComponent } from './components/dashboard-overview/dashboard-overview.component';
import { NavLinkComponent } from './components/nav-link/nav-link.component';
import { OverviewCardsComponent } from './components/overview-cards/overview-cards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilmsComponent } from './films/films.component';
import { SpeciesComponent } from './species/species.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavLinkComponent,
    FilmsComponent,
    OverviewCardsComponent,
    DashboardOverviewComponent,
    SpeciesComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
