import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Person } from 'src/app/interfaces/person.interface';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {
  people: Person[] = [];
  demoPersonUrl = 'assets/images/person.jpg';

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      response => this.dataService.setData(response),
      error => console.log(error)
    );

    this.dataService.getItems().subscribe(
      response => {
        this.people = response;
        this.dataService.viewLoaded();
      },
      error => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.people = [];
    this.dataService.viewUnloaded();
  }

  isNumber(item: string): boolean {
    return !!parseInt(item, 10);
  }


}
