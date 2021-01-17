import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Vehicle } from 'src/app/interfaces/vehicle.interface';
import { isNumber } from '../../utils/isNumber.util';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'col';
  vehicles: Vehicle[] = [];
  isNumber = isNumber;

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.retrieveAndSetData();

    this.dataService.getItems().subscribe(
      response => this.vehicles = response,
      error => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.vehicles = [];
  }
}
