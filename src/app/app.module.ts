import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './views/login/login.module';
import { NavLinkComponent } from './components/nav-link/nav-link.component';
import { OverviewCardsComponent } from './components/overview-cards/overview-cards.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FilmsComponent } from './views/films/films.component';
import { SpeciesComponent } from './views/species/species.component';
import { VehiclesComponent } from './views/vehicles/vehicles.component';
import { PeopleComponent } from './views/people/people.component';
import { StarshipsComponent } from './views/starships/starships.component';
import { DashboardOverviewComponent } from './views/dashboard-overview/dashboard-overview.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavLinkComponent,
    FilmsComponent,
    OverviewCardsComponent,
    DashboardOverviewComponent,
    SpeciesComponent,
    SpinnerComponent,
    VehiclesComponent,
    PeopleComponent,
    StarshipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
