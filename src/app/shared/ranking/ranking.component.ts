import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  @Input() pointsTotal!: number;
  @Input() ranking!: {} ;
  @Input() user!: any;

  rankingPais: number = 0;
  rankingAgencia: number = 0;
  rankingRegion: number = 0;

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pointsTotal']) {
      this.pointsTotal = changes['pointsTotal'].currentValue;
    }
    if (changes['ranking']) {
      this.rankingPais = changes['ranking'].currentValue.rankingPais
      this.rankingAgencia = changes['ranking'].currentValue.rankingAgencia
      this.rankingRegion = changes['ranking'].currentValue.rankingRegion
    }
  }

}
