import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Person } from 'src/app/interfaces/person.interface';
import { isNumber } from '../../utils/isNumber.util';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'col';
  people: Person[] = [];
  demoPersonUrl = 'assets/images/person.jpg';
  isNumber = isNumber;

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.retrieveAndSetData();

    this.dataService.getItems().subscribe(
      response => this.people = response,
      error => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.people = [];
  }
}
