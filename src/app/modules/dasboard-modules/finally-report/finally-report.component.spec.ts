import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinallyReportComponent } from './finally-report.component';
import { ReportsRepository } from 'src/app/core/repositories/reportsCash.respository';
import { ReportRepository } from 'src/app/core/repositories/report.repository';
import { HeaderReportFinallyComponent } from 'src/app/shared/header-report-finally/header-report-finally.component';
import { SelectorReportComponent } from 'src/app/shared/selector-report/selector-report.component';
import { SelectorReportFinallyComponent } from 'src/app/shared/selector-report-finally/selector-report-finally.component';
import { IndicatorReportComponent } from 'src/app/shared/indicator-report/indicator-report.component';
import { RankingComponent } from 'src/app/shared/ranking/ranking.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { of, throwError } from 'rxjs';
import { InfoCountAfiliateFinallyModel } from 'src/app/core/models/InfoCountAfiliateFinally.model';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndicatorIndividualComponent } from 'src/app/shared/indicator-individual/indicator-individual.component';
import { PeriodsModel } from 'src/app/core/models/Periods.model';
import { SegmentsModel } from 'src/app/core/models/Segments.model';
import { RegionalModel } from 'src/app/core/models/Regional.model';
import { AgenciesModel } from 'src/app/core/models/Agencies.model';
import * as CryptoJS from 'crypto-js';
import { PipeMoneyPipe } from 'src/app/pipes/pipe-money.pipe';
import { CompliancesModel } from 'src/app/core/models/Compliances.model';
import { AffiliateRanking } from 'src/app/core/models/UserRanking.model';

export const saveSession = (key: string, data: any) => {
  const valueEncrypt = CryptoJS.AES.encrypt(JSON.stringify(data), 'V4l3pr04dm1n' + key).toString();
  sessionStorage.setItem(key, valueEncrypt);
};

export const saveSessionAffiliate = (key: string, data: any) => {
  const valueEncrypt = CryptoJS.AES.encrypt(JSON.stringify(data), 'V4l3pr0US3r' + key).toString();
  sessionStorage.setItem(key, valueEncrypt);
};

const mockPeriods: ResponseBase<PeriodsModel[]> = {
  codeId: 200, message: 'success', data: [
    {
      PeriodId: 1,
      ProgramId: 101,
      Name: 'Programa de Desarrollo',
      Status: true,
      DateInitial: '2023-01-01',
      DateFinal: '2023-12-31',
      ExpirationDate: '2024-01-15'
    }
  ]
};
const mockSegments: ResponseBase<SegmentsModel[]> = {
  codeId: 200,
  message: 'success',
  data: [{
    ClusterId: 5,
    ProgramId: 101,
    Name: 'Cluster Principal',
    PointValue: 1500,
    Active: true
  }]
};
const mockRegionales: ResponseBase<RegionalModel[]> = {
  codeId: 200,
  message: 'success',
  data: [{
    RegionalId: 3,
    ProgramId: 202,
    Name: 'Regional Norte',
    Status: true
  }]
};
const mockAgencies: ResponseBase<AgenciesModel[]> = {
  codeId: 200,
  message: 'success',
  data:
    [{ AgencyId: 1, Name: 'name uno' }]
};

describe('FinallyReportComponent', () => {
  let component: FinallyReportComponent;
  let fixture: ComponentFixture<FinallyReportComponent>;
  let reportRepositorySpy: jasmine.SpyObj<ReportRepository>;

  beforeEach(() => {
    reportRepositorySpy = jasmine.createSpyObj('ReportRepository', [
      'getInfoCountAffiliateFinally',
      'getPeriods',
      'getSegments',
      'getRegional',
      'getAgencies',
      'getInfoAffiliateFinally',
      'getInfoAdminFinally',
      'getInfoRanking'
    ])
    TestBed.configureTestingModule({
      declarations: [FinallyReportComponent, HeaderReportFinallyComponent, SelectorReportFinallyComponent, IndicatorReportComponent, RankingComponent, IndicatorIndividualComponent, PipeMoneyPipe],
      imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: ReportRepository, useValue: reportRepositorySpy },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    sessionStorage.clear;
    fixture = TestBed.createComponent(FinallyReportComponent);
    component = fixture.componentInstance;
    const mockResponse: ResponseBase<InfoCountAfiliateFinallyModel> = {
      codeId: 200,
      message: 'success',
      data: {
        dataUser: {
          AccountId: 1,
          Segment: 'segmento uno',
          Regional: ['norte', 'sur'],
          Agency: 'agencia uno'
        }
      }
    };

    const configVisual = {
      imageBackgroundLogin: 'some.jpg'
    }
    const userData = {
      user: 'admin'
    }
    saveSession('configVisual', configVisual);
    saveSession('userLoginData', userData);
    saveSessionAffiliate('userData', userData);
    reportRepositorySpy.getInfoCountAffiliateFinally.and.returnValue(of(mockResponse));
    reportRepositorySpy.getPeriods.and.returnValue(of(mockPeriods));
    reportRepositorySpy.getSegments.and.returnValue(of(mockSegments));
    reportRepositorySpy.getRegional.and.returnValue(of(mockRegionales));
    reportRepositorySpy.getAgencies.and.returnValue(of(mockAgencies));
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign default flags when response does not have ComplianceInfo', () => {
    const mockResponse: ResponseBase<CompliancesModel> = {
      codeId: 200,
      message: 'success',
      data: {
        CumplimientosInfo: []
      }
    };


    reportRepositorySpy.getInfoAffiliateFinally.and.returnValue(of(mockResponse));

    component.getInfoAffiliate();

    expect(component.indicators).toEqual([
      { Indicator: 'Indicador 1', Finishline: 0, Compliance: 0, Points: 0 },
      { Indicator: 'Indicador 2', Finishline: 0, Compliance: 0, Points: 0 },
      { Indicator: 'Indicador 3', Finishline: 0, Compliance: 0, Points: 0 },
    ]);
  });


  it('should assign default flags when there is an error in the API call', () => {
    reportRepositorySpy.getInfoAffiliateFinally.and.returnValue(throwError(() => new Error('Error en la API')));

    component.getInfoAffiliate();

    expect(component.indicators).toEqual([
      { Indicator: 'Indicador 1', Finishline: 0, Compliance: 0, Points: 0 },
      { Indicator: 'Indicador 2', Finishline: 0, Compliance: 0, Points: 0 },
      { Indicator: 'Indicador 3', Finishline: 0, Compliance: 0, Points: 0 },
    ]);
  });

  it('should update agencies when API call is successful', () => {
    const mockRegionals = [1, 2];
    const mockAgencies: ResponseBase<AgenciesModel[]> =
    {
      codeId: 200,
      message: 'success',
      data: []
    }
    reportRepositorySpy.getAgencies.and.returnValue(of(mockAgencies));
    component.getAgencies(mockRegionals);

    expect(component.agencias).toEqual(mockAgencies.data);
    expect(component.Regional).toEqual(mockRegionals);
    expect(reportRepositorySpy.getAgencies).toHaveBeenCalledWith(mockRegionals);
  });

  it('should assign empty agencies when there is an error in the API call', () => {
    const mockRegionals = [1, 2];
    reportRepositorySpy.getAgencies.and.returnValue(throwError(() => new Error('Error en la API')));

    component.getAgencies(mockRegionals);

    expect(component.agencias).toEqual([]);
    expect(component.Regional).toEqual(mockRegionals);
    expect(reportRepositorySpy.getAgencies).toHaveBeenCalledWith(mockRegionals);
  });


  it('should update properties and call getInfoAdmin', () => {
    const mockSelectors = {
      Segments: [1, 2],
      Agencies: [1, 2],
      Rols: [1, 2],
    };

    spyOn(component, 'getInfoAdmin').and.callThrough();
    component.getInfoIndicators(mockSelectors);

    expect(component.Segment).toBe(mockSelectors.Segments);
    expect(component.Agency).toBe(mockSelectors.Agencies);
    expect(component.Role).toBe(mockSelectors.Rols);
    expect(component.getInfoAdmin).toHaveBeenCalled();
  });


  it('should update indicators with API data on success', () => {
    const mockResponse: ResponseBase<CompliancesModel> = {
      codeId: 200,
      message: 'success',
      data: {
        CumplimientosInfo: [
          { Indicator: 'Indicador 1', Finishline: 10, Compliance: 5, Points: 20 },
          { Indicator: 'Indicador 2', Finishline: 20, Compliance: 15, Points: 30 }
        ]
      }
    };

    component.periodSend = 1;
    component.Segment = [];
    component.Regional = [];
    component.Agency = [];
    component.Role = [];

    reportRepositorySpy.getInfoAdminFinally.and.returnValue(of(mockResponse));
    component.getInfoAdmin();

    expect(component.indicators).toEqual([
      { Indicator: 'Indicador 1', Finishline: 10, Compliance: 5, Points: '20' },
      { Indicator: 'Indicador 2', Finishline: 20, Compliance: 15, Points: '30' }
    ]);
  });

  it('should update ranking and total points with valid API data', () => {
    const mockResponse: ResponseBase<AffiliateRanking> = {
      codeId: 200,
      message: 'success',
      data: {
        AccountId: 12,
        TotalPoints: 150,
        RankingLevels: [
          { LevelName: 'País', Ranking: 1 },
          { LevelName: 'Agencia', Ranking: 2 },
          { LevelName: 'Regional', Ranking: 3 }
        ]
      }
    };

    component.periodSend = 1;
    component.user = { countId: 123 };

    reportRepositorySpy.getInfoRanking.and.returnValue(of(mockResponse));
    component.getInfoRanking();

    expect(component.ranking).toEqual({
      rankingPais: 1,
      rankingAgencia: 2,
      rankingRegion: 3
    });
    expect(component.pointsTotal).toBe(150);
  });


  it('should update information with valid API data', () => {
    const mockResponse: ResponseBase<InfoCountAfiliateFinallyModel> = {
      codeId: 200,
      message: 'success',
      data: {
        dataUser: {
          AccountId: 1,
          Segment: 'Segmento A',
          Regional: ['Regional1'],
          Agency: 'Agencia X'
        }
      }
    };

    component.user = { countId: 123 };
    reportRepositorySpy.getInfoCountAffiliateFinally.and.returnValue(of(mockResponse));
    component.getInfoAccount();

    expect(component.information).toEqual({
      force: 'Segmento A',
      regional: 'Regional1...',
      cedi: 'Agencia X',
      occupation: '---'
    });
  });


});
