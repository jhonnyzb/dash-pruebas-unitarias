import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringReportComponent } from './monitoring-report.component';
import { ReportRepository } from 'src/app/core/repositories/report.repository';
import { HeaderReportFinallyComponent } from 'src/app/shared/header-report-finally/header-report-finally.component';
import { HeaderReportComponent } from 'src/app/shared/header-report/header-report.component';
import { SelectorReportFinallyComponent } from 'src/app/shared/selector-report-finally/selector-report-finally.component';
import { SelectorReportComponent } from 'src/app/shared/selector-report/selector-report.component';
import { IndicatorReportComponent } from 'src/app/shared/indicator-report/indicator-report.component';
import { RankingComponent } from 'src/app/shared/ranking/ranking.component';
import { IndicatorIndividualComponent } from 'src/app/shared/indicator-individual/indicator-individual.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipeMoneyPipe } from 'src/app/pipes/pipe-money.pipe';
import { of } from 'rxjs';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { CompliancesModel } from 'src/app/core/models/Compliances.model';

describe('MonitoringReportComponent', () => {
  let component: MonitoringReportComponent;
  let fixture: ComponentFixture<MonitoringReportComponent>;
  let reportRepositorySpy: jasmine.SpyObj<ReportRepository>;
  beforeEach(() => {
    reportRepositorySpy = jasmine.createSpyObj('ReportRepository',
      [
        'getSelector',
        'getReportAffiliate'
      ])
    TestBed.configureTestingModule({
      declarations: [MonitoringReportComponent, HeaderReportFinallyComponent, HeaderReportComponent, SelectorReportComponent, IndicatorReportComponent, RankingComponent, IndicatorIndividualComponent, PipeMoneyPipe],
      imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: ReportRepository, useValue: reportRepositorySpy },
      ]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values when API response has no data', () => {
    const mockResponse: ResponseBase<CompliancesModel> = {
      codeId: 200,
      message: 'success',
      data: {
        CumplimientosInfo: [],
        dateUpload: ''
      }
    };

    reportRepositorySpy.getReportAffiliate.and.returnValue(of(mockResponse));

    component.getReportAffiliate('document');

    expect(component.indicators).toEqual([
      { Indicator: 'Indicador 1', Finishline: 0, Compliance: 0, Points: 0 },
      { Indicator: 'Indicador 2', Finishline: 0, Compliance: 0, Points: 0 },
      { Indicator: 'Indicador 3', Finishline: 0, Compliance: 0, Points: 0 }
    ]);
    expect(component.information).toEqual({
      force: '--',
      regional: '--',
      cedi: '--',
      cargo: '--'
    });
    expect(component.pointsTotal).toBe(0);
  });


  it('should update properties with valid API data', () => {
    const mockResponse: ResponseBase<CompliancesModel> = {
      codeId: 200,
      message: 'success',
      data: {
        CumplimientosInfo: [
          {
            Indicator: 'Indicador A',
            Finishline: 10,
            Compliance: 5,
            Points: 100,
            Segment: 'Segmento A',
            Regional: 'Regional1',
            Agency: 'Agencia X',
            Role: 'Cargo Y',
            RankinCountry: 1,
            RankinAgency: 2,
            RankinRegion: 3
          }
        ],
        dateUpload: '2024-09-10'
      }
    };

    reportRepositorySpy.getReportAffiliate.and.returnValue(of(mockResponse));

    component.getReportAffiliate('80538583');

    expect(component.indicators).toEqual([
      {
        Indicator: 'Indicador A',
        Finishline: 10,
        Compliance: 5,
        Points: 100,
        Segment: 'Segmento A',
        Regional: 'Regional1',
        Agency: 'Agencia X',
        Role: 'Cargo Y',
        RankinCountry: 1,
        RankinAgency: 2,
        RankinRegion: 3
      }
    ]);
    expect(component.dateReport).toBe('2024-09-10');
    expect(component.ranking).toEqual({
      rankingPais: 1,
      rankingAgencia: 2,
      rankingRegion: 3
    });
    expect(component.information).toEqual({
      force: 'Segmento A',
      regional: 'Regional1',
      cedi: 'Agencia X',
      cargo: 'Cargo Y'
    });
    expect(component.pointsTotal).toBe(100);
  });

});
