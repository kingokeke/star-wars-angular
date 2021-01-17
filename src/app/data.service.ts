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
  resetPagination: BehaviorSubject<any> = new BehaviorSubject(false);
  setPagination: BehaviorSubject<any> = new BehaviorSubject(false);

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

  viewLoaded(): void {
    this.setPagination.next(true);
  }

  didViewLoad(): Observable<boolean> {
    return this.setPagination.asObservable();
  }

  viewUnloaded(): void {
    this.resetPagination.next(true);
  }

  didViewUnload(): Observable<boolean> {
    return this.resetPagination.asObservable();
  }

  setNextPage(url: string): void {
    this.nextPage.next(url);
  }

  setPreviousPage(url: string): void {
    this.previousPage.next(url);
  }

  getData(page?: number): Observable<any> {
    const currentUrl = this.router.url;
    let result: Observable<any> = new Observable();
    this.resetData();

    if (currentUrl.includes(PAGES.SPECIES)) {
      result = this.getSpecies(page);
    }

    if (currentUrl.includes(PAGES.VEHICLES)) {
      result = this.getVehicles(page);
    }

    if (currentUrl.includes(PAGES.PEOPLE)) {
      result = this.getPeople(page);
    }

    if (currentUrl.includes(PAGES.STARSHIPS)) {
      result = this.getStarships(page);
    }

    if (currentUrl.includes(PAGES.DASHBOARD)) {
      result = this.getFilms(page);
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
}
