import { Component, OnDestroy, OnInit } from '@angular/core';
import { Species } from '../interfaces/species.interface';
import { DataService } from '../data.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit, OnDestroy {
  species: Species[] = [];

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      response => this.dataService.setData(response),
      error => console.log(error)
    );

    this.dataService.getItems().subscribe(
      response => {
        this.species = response;
        this.dataService.viewLoaded();
      },
      error => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.species = [];
    this.dataService.viewUnloaded();
  }

  isNumber(item: string): boolean {
    return !!parseInt(item, 10);
  }
}
