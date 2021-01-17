import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Starship } from '../../interfaces/starship.interface';
import { isNumber } from '../../utils/isNumber.util';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'col';
  starships: Starship[] = [];
  isNumber = isNumber;

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.retrieveAndSetData();

    this.dataService.getItems().subscribe(
      response => this.starships = response,
      error => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.starships = [];
  }
}
