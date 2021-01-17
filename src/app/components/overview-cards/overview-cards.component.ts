import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { SummaryCard } from '../../interfaces/summarycard.interface';

@Component({
  selector: 'app-overview-cards',
  templateUrl: './overview-cards.component.html',
  styleUrls: ['./overview-cards.component.scss']
})
export class OverviewCardsComponent implements OnInit {
  @HostBinding('class') class = 'col';
  @Input() cardData: SummaryCard = {
    title: 'Loading...',
    totalCount: 0,
    increaseCount: 0,
    imageUrl: 'assets/images/dummy.svg',
    backgroundColor: 'hsla(0, 10%, 10%, 0.2)'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
