import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { NavLinkComponent } from '../components/nav-link/nav-link.component';

@NgModule({
  declarations: [DashboardComponent, NavLinkComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DashboardModule { }
