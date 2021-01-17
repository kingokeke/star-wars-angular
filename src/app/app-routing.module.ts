import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardOverviewComponent } from './views/dashboard-overview/dashboard-overview.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { PeopleComponent } from './views/people/people.component';
import { SpeciesComponent } from './views/species/species.component';
import { StarshipsComponent } from './views/starships/starships.component';
import { VehiclesComponent } from './views/vehicles/vehicles.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [{ path: '', component: DashboardOverviewComponent }] },
  { path: 'starships', component: DashboardComponent, children: [{ path: '', component: StarshipsComponent }] },
  { path: 'people', component: DashboardComponent, children: [{ path: '', component: PeopleComponent }] },
  { path: 'vehicles', component: DashboardComponent, children: [{ path: '', component: VehiclesComponent }] },
  { path: 'species', component: DashboardComponent, children: [{ path: '', component: SpeciesComponent }] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
