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

  films: Film[] = [];
  filmLogoUrl = 'assets/images/film.svg';
  demoDirectorUrl = 'assets/images/person.jpg';
  demoProducerUrl = 'assets/images/person.jpg';

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      response => this.dataService.setData(response),
      error => console.log(error)
    );

    this.dataService.getItems().subscribe(
      response => {
        this.films = response;
        this.dataService.viewLoaded();
      },
      error => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.films = [];
    this.dataService.viewUnloaded();
  }

  isNumber(item: string): boolean {
    return !!parseInt(item, 10);
  }

}
