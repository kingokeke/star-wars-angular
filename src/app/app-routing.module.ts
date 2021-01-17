import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilmsComponent } from './films/films.component';
import { SpeciesComponent } from './species/species.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [{ path: '', component: FilmsComponent }] },
  { path: 'starships', component: DashboardComponent, children: [{ path: '', component: FilmsComponent }] },
  { path: 'people', component: DashboardComponent, children: [{ path: '', component: FilmsComponent }] },
  { path: 'vehicles', component: DashboardComponent, children: [{ path: '', component: FilmsComponent }] },
  { path: 'species', component: DashboardComponent, children: [{ path: '', component: SpeciesComponent }] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
