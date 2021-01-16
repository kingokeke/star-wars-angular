import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  logoUrl = 'assets/images/logo.png';
  userImageUrl = 'assets/images/user.png';
  navLinks = [
    { name: 'Dashboard', url: '/dashboard', icon: 'tachometer-alt' },
    { name: 'Starships', url: '/starships', icon: 'rocket' },
    { name: 'People', url: '/people', icon: 'user-friends' },
    { name: 'Vehicles', url: '/vehicles', icon: 'truck-monster' },
    { name: 'Species', url: '/species', icon: 'dragon' },
  ];
  showYearDropdown = false;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  toggleYearDropdown(): void {
    this.showYearDropdown = !this.showYearDropdown;
  }

  navigateToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
