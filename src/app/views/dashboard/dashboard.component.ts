import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

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
  totalCount = 0;
  currentStart = 0;
  currentEnd = 0;
  currentPage = 1;
  data: any[] = [];

  constructor(
    private readonly router: Router, private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      response => {
        this.dataService.setData(response);
        this.setPagination('current');
      },
      error => console.log(error)
    );

    this.dataService.getCount().subscribe(
      response => this.totalCount = response,
      error => console.log(error)
    );

    this.dataService.didViewLoad().subscribe(
      setPagination => {
        if (setPagination) {
          this.dataService.getCount().subscribe(
            response => {
              this.totalCount = response;
              this.setPagination('current');
            },
            error => console.log(error)
          );
        }
      }
    );

    this.dataService.didViewUnload().subscribe(
      resetPagination => {
        if (resetPagination) {
          this.resetPagination();
        }
      }
    );
  }

  toggleYearDropdown(): void {
    this.showYearDropdown = !this.showYearDropdown;
  }

  navigateToDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  loadPreviousPage(): void {
    this.resetPagination();
    this.dataService.loadPreviousPage().subscribe(
      response => {
        this.dataService.setData(response);
        this.setPagination('previous');
      },
      error => console.log(error)
    );
  }

  loadNextPage(): void {
    this.resetPagination();
    this.dataService.loadNextPage().subscribe(
      response => {
        this.dataService.setData(response);
        this.setPagination('next');
      },
      error => console.log(error)
    );
  }

  setPagination(action: string): void {
    action === 'next' ? this.currentPage += 1 : action === 'previous' ? this.currentPage -= 1 : this.currentPage = 1;
    this.currentEnd = Math.min(this.totalCount, (this.currentPage * 10));
    this.currentStart = this.currentEnd ? ((this.currentPage - 1) * 10) + 1 : 0;
  }

  resetPagination(): void {
    this.currentStart = 0;
    this.currentEnd = 0;
    this.totalCount = 0;
  }
}
