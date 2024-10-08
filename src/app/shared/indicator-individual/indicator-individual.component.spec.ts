import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorIndividualComponent } from './indicator-individual.component';
import { PipeMoneyPipe } from 'src/app/pipes/pipe-money.pipe';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('IndicatorIndividualComponent', () => {
  let component: IndicatorIndividualComponent;
  let fixture: ComponentFixture<IndicatorIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndicatorIndividualComponent, PipeMoneyPipe],
      imports: [
        
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IndicatorIndividualComponent);
    component = fixture.componentInstance;
    component.indicator = {
      Indicator: "Ventas Totales",
      Finishline: 100,
      Compliance: 80,
      Points: "75",
      ProgramId: "12345",
      Identification: "987654321",
      Role: "Gerente",
      Regional: "Norte",
      Agency: "Agencia Central",
      Segment: "Empresas",
      RankinCountry: 5,
      RankinAgency: 2,
      RankinRegion: 1,
    }
    component.user = {
      typeUser: 'affiliate'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize percentages and color based on indicator changes', () => {
    component.indicator = {
      Indicator: 'Performance',
      Finishline: 100,
      Compliance: 80,
      Points: 75, 
      ProgramId: 1234,
      Identification: 'ID5678',
      Role: 'Manager',
      Regional: 'North America',
      Agency: 'Agency XYZ',
      Segment: 'Segment A',
      RankinCountry: 1,
      RankinAgency: 3,
    };
    component.ngOnChanges({ indicator: { currentValue: component.indicator, previousValue: undefined, firstChange: true, isFirstChange: () => true } });

    expect(component.percentages).toBe(80);
    expect(component.color).toBe('red');
  });
});
