import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { PAGES } from '../../enums/pages.enum';
import { PAGINATION } from '../../enums/pagination.enum';

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
  currentViewPlaceholder: any = '';
  showPagination = false;
  showYearDropdown = false;
  totalCount = 0;
  currentStart = 0;
  currentEnd = 0;
  currentPage = 1;
  data: any[] = [];
  searchTerm = '';
  paginationAction: PAGINATION = PAGINATION.CURRENT;

  constructor(
    private readonly router: Router, private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.retrieveAndSetData();
    this.setTotalCount();
  }

  toggleYearDropdown(): void {
    this.showYearDropdown = !this.showYearDropdown;
  }

  navigateToDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  loadPreviousPage(): void {
    this.paginationAction = PAGINATION.PREVIOUS;
    this.dataService.loadPreviousPage().subscribe(
      response => this.dataService.setData(response),
      error => console.log(error)
    );
  }

  loadNextPage(): void {
    this.paginationAction = PAGINATION.NEXT;
    this.dataService.loadNextPage().subscribe(
      response => this.dataService.setData(response),
      error => console.log(error)
    );
  }

  setPagination(action: PAGINATION): void {
    if (this.totalCount) {
      action === PAGINATION.NEXT ? this.currentPage += 1 : action === PAGINATION.PREVIOUS ? this.currentPage -= 1 : this.currentPage = 1;
    }
    this.currentEnd = Math.min(this.totalCount, (this.currentPage * 10));
    this.currentStart = this.currentEnd ? ((this.currentPage - 1) * 10) + 1 : 0;
    this.showPagination = !this.router.url.includes(PAGES.DASHBOARD);
  }

  getCurrentViewPlaceholder(): void {
    this.currentViewPlaceholder = this.router.url.split('/').pop();
  }

  searchRecords(): void {
    this.dataService.retrieveAndSetData(1, this.searchTerm);
  }

  setTotalCount(): void {
    this.dataService.getCount().subscribe(
      response => {
        this.totalCount = response;
        this.setPagination(this.paginationAction);
        this.getCurrentViewPlaceholder();
      },
      error => console.log(error)
    );
  }
}
