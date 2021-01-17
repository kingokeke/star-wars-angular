import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Starship } from '../../interfaces/starship.interface';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit, OnDestroy {

  starships: Starship[] = [];

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      response => this.dataService.setData(response),
      error => console.log(error)
    );

    this.dataService.getItems().subscribe(
      response => {
        this.starships = response;
        this.dataService.viewLoaded();
      },
      error => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.starships = [];
    this.dataService.viewUnloaded();
  }

  isNumber(item: string): boolean {
    return !!parseInt(item, 10);
  }
}
