import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PAGES } from './enums/pages.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  items: BehaviorSubject<any> = new BehaviorSubject([]);
  totalCount: BehaviorSubject<number> = new BehaviorSubject(0);
  currentPage: BehaviorSubject<number> = new BehaviorSubject(1);
  nextPage: BehaviorSubject<string> = new BehaviorSubject('');
  previousPage: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  setItems(newItems: any[]): void {
    this.items.next(newItems);
  }

  getItems(): Observable<any> {
    return this.items.asObservable();
  }

  setCount(count: number): void {
    this.totalCount.next(count);
  }

  getCount(): Observable<number> {
    return this.totalCount.asObservable();
  }

  setNextPage(url: string): void {
    this.nextPage.next(this.upgradeToHttps(url));
  }

  setPreviousPage(url: string): void {
    this.previousPage.next(this.upgradeToHttps(url));
  }

  getData(page?: number, searchTerm?: string): Observable<any> {
    const currentUrl = this.router.url;
    let result: Observable<any> = new Observable();
    this.resetData();

    if (currentUrl.includes(PAGES.SPECIES)) {
      result = this.getSpecies(page, searchTerm);
    }

    if (currentUrl.includes(PAGES.VEHICLES)) {
      result = this.getVehicles(page, searchTerm);
    }

    if (currentUrl.includes(PAGES.PEOPLE)) {
      result = this.getPeople(page, searchTerm);
    }

    if (currentUrl.includes(PAGES.STARSHIPS)) {
      result = this.getStarships(page, searchTerm);
    }

    if (currentUrl.includes(PAGES.DASHBOARD)) {
      result = this.getFilms(page, searchTerm);
    }

    return result;
  }

  setData(data: any): void {
    this.setItems(data.results);
    this.setCount(data.count);
    this.setNextPage(data.next);
    this.setPreviousPage(data.previous);
  }

  resetData(): void {
    this.setItems([]);
    this.setCount(0);
  }

  getSpecies(page = 1, searchTerm = ''): Observable<any> {
    const url = `${environment.starwarsApi}/${environment.speciesEndpoint}/?page=${page}&search=${searchTerm}`;
    return this.http.get(url);
  }

  getVehicles(page = 1, searchTerm = ''): Observable<any> {
    const url = `${environment.starwarsApi}/${environment.vehiclesEndpoint}/?page=${page}&search=${searchTerm}`;
    return this.http.get(url);
  }

  getPeople(page = 1, searchTerm = ''): Observable<any> {
    const url = `${environment.starwarsApi}/${environment.peopleEndpoint}/?page=${page}&search=${searchTerm}`;
    return this.http.get(url);
  }

  getStarships(page = 1, searchTerm = ''): Observable<any> {
    const url = `${environment.starwarsApi}/${environment.starshipsEndpoint}/?page=${page}&search=${searchTerm}`;
    return this.http.get(url);
  }

  getFilms(page = 1, searchTerm = ''): Observable<any> {
    const url = `${environment.starwarsApi}/${environment.filmsEndpoint}/?page=${page}&search=${searchTerm}`;
    return this.http.get(url);
  }

  loadPreviousPage(): Observable<any> {
    const url = this.previousPage.value;
    this.resetData();
    return this.http.get(url);
  }

  loadNextPage(): Observable<any> {
    const url = this.nextPage.value;
    this.resetData();
    return this.http.get(url);
  }

  searchRecords(searchItem: string): Observable<any> {
    return this.getData(1, searchItem);
  }

  retrieveAndSetData(page = 1, searchTerm = ''): void {
    this.getData(page, searchTerm).subscribe(
      response => this.setData(response),
      error => console.log(error)
    );
  }

  upgradeToHttps(url: string): string {
    return url?.includes('https://') ? url : url?.replace('http', 'https');
  }
}
