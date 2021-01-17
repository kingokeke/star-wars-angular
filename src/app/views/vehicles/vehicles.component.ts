import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Vehicle } from 'src/app/interfaces/vehicle.interface';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'col';
  vehicles: Vehicle[] = [];

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      response => this.dataService.setData(response),
      error => console.log(error)
    );

    this.dataService.getItems().subscribe(
      response => {
        this.vehicles = response;
        this.dataService.viewLoaded();
      },
      error => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.vehicles = [];
    this.dataService.viewUnloaded();
  }

  isNumber(item: string): boolean {
    return !!parseInt(item, 10);
  }

}
