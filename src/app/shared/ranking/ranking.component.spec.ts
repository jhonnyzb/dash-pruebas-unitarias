import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingComponent } from './ranking.component';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankingComponent]
    })
      .compileComponents();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
    component.user = {
      typeUser: 'affiliate'
    }
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update pointsTotal when pointsTotal input changes', () => {
    const newPointsTotal = 100;
    const changes: SimpleChanges = {
      pointsTotal: new SimpleChange(null, newPointsTotal, true)
    };

    component.ngOnChanges(changes);

    expect(component.pointsTotal).toBe(newPointsTotal);
  });

  it('should update ranking properties when ranking input changes', () => {
    const newRanking = {
      rankingPais: 1,
      rankingAgencia: 2,
      rankingRegion: 3
    };
    const changes: SimpleChanges = {
      ranking: new SimpleChange(null, newRanking, true)
    };

    component.ngOnChanges(changes);

    expect(component.rankingPais).toBe(newRanking.rankingPais);
    expect(component.rankingAgencia).toBe(newRanking.rankingAgencia);
    expect(component.rankingRegion).toBe(newRanking.rankingRegion);
  });
});
