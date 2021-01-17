import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Film } from 'src/app/interfaces/film.interface';
@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'col';
  isLoading = true;
  showData = false;

  films: Film[] = [];
  filmLogoUrl = 'assets/images/film.svg';
  demoDirectorUrl = 'assets/images/person.jpg';
  demoProducerUrl = 'assets/images/person.jpg';

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.retrieveAndSetData(1, '');

    this.dataService.getItems().subscribe(
      response => {
        if (response === null || response.length === 0) {
          return;
        }
        this.films = response;
        this.showData = true;
        this.dataService.viewLoaded();
        this.isLoading = false;
      },
      error => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.films = [];
    this.dataService.viewUnloaded();
  }
}
