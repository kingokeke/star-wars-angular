import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Species } from 'src/app/interfaces/species.interface';
import { isNumber } from '../../utils/isNumber.util';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'col';
  species: Species[] = [];
  isNumber = isNumber;

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.retrieveAndSetData();

    this.dataService.getItems().subscribe(
      response => this.species = response,
      error => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.species = [];
  }
}
