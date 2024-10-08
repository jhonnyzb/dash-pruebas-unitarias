import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReportService } from './report.service';
import { RequestIndicatorsAdmin } from 'src/app/core/models/requestIndicatorsAdmin.model';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { IndicatorResponseDTO } from '../dto/indicatorResponse.dto';
import { environment } from 'src/environments/environment';
import { CompliancesModel } from 'src/app/core/models/Compliances.model';
import { SelectorResponseDTO, SelectorResponseFDTO1 } from '../dto/selectorResponse.dto';
import { SelectorResponseModel, SelectorResponseModelFinally } from 'src/app/core/models/selectorResponse.model';
import { compliancesResponseDTO } from '../dto/complianceResponse.dto';
import { ComplianceMapper } from 'src/app/core/mappers/compliance.mapper';
import { RankingMapper } from 'src/app/core/mappers/ranking.mapper';
import { AffiliateRanking } from 'src/app/core/models/UserRanking.model';
import { affiliateRankingDTO } from '../dto/rankingResponse.dto';
import { PeriodMapper } from 'src/app/core/mappers/period.mapper';
import { PeriodsModel } from 'src/app/core/models/Periods.model';
import { periodResponseDTO } from '../dto/periodResponse.dto';
import { segmentResponseDTO } from '../dto/segmentResponse.dto';
import { SegmentsModel } from 'src/app/core/models/Segments.model';
import { regionalResponseDTO } from '../dto/regionalResponse.dto';
import { RegionalModel } from 'src/app/core/models/Regional.model';
import { agenciesResponseDTO } from '../dto/agenciesResponse.dto';
import { AgenciesModel } from 'src/app/core/models/Agencies.model';
import { infoCountResponseDTO } from '../dto/infoCountResponse.dto';
import { InfoCountAfiliateFinallyModel } from 'src/app/core/models/InfoCountAfiliateFinally.model';
import { AccountMapper } from 'src/app/core/mappers/account.mapper';


describe('ReportService', () => {
  let service: ReportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ReportService
      ]
    });
    service = TestBed.inject(ReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getReportAdmin and return transformed data', () => {
    const mockDocument = '123456789';
    const mockRequest: RequestIndicatorsAdmin = {
      Regionals: ['Region 1'],
      Agencies: ['Agency 1'],
      Rols: ['Role 1'],
      Segments: ['Segment 1']
    };

    const mockResponse: ResponseBase<IndicatorResponseDTO> = {
      codeId: 200,
      message: 'Success',
      data: {
        data: [
          {
            upload_Date: '2024-01-23',
            compliances: [
              {
                programId: 6,
                identification: '123456',
                role: 'vendedor',
                regional: 'sur',
                agency: 'dos',
                segment: 'norte',
                variable: 'ventas gaseosas',
                target: 200,
                compliance: 100,
                pointsEarned: 5000,
                rankinCountry: 3,
                rankinAgency: 3,
                rankinRegion: 3,
              }
            ]
          }

        ]
      }
    };

    const mockTransformedData: ResponseBase<CompliancesModel> = {
      codeId: 200,
      message: 'Success',
      data: {
        CumplimientosInfo: [
          {
            Indicator: 'ventas gaseosas',
            Finishline: 200,
            Compliance: 100,
            Points: 5000,
            ProgramId: 6,
            Identification: '123456',
            Role: 'vendedor',
            Regional: 'sur',
            Agency: 'dos',
            Segment: 'norte',
            RankinCountry: 3,
            RankinAgency: 3,
            RankinRegion: 3,
          }
        ],
        dateUpload: '2024-01-23'
      }
    };

    service.getReportAdmin(mockDocument, mockRequest).subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/compliance-api/api/v1/DataFilteredCompliance/get-data-filtered-compliance`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call getReportAffiliate and return transformed data', () => {
    const mockDocument = '987654321';
    const mockResponse: ResponseBase<IndicatorResponseDTO> = {
      codeId: 200,
      message: 'Success',
      data: {
        data: [
          {
            upload_Date: '2024-01-23',
            compliances: [
              {
                programId: 6,
                identification: '123456',
                role: 'vendedor',
                regional: 'sur',
                agency: 'dos',
                segment: 'norte',
                variable: 'ventas gaseosas',
                target: 200,
                compliance: 100,
                pointsEarned: 5000,
                rankinCountry: 3,
                rankinAgency: 3,
                rankinRegion: 3,
              }
            ]
          }

        ]
      }
    };

    const mockTransformedData: ResponseBase<CompliancesModel> = {
      codeId: 200,
      message: 'Success',
      data: {
        CumplimientosInfo: [
          {
            Indicator: 'ventas gaseosas',
            Finishline: 200,
            Compliance: 100,
            Points: 5000,
            ProgramId: 6,
            Identification: '123456',
            Role: 'vendedor',
            Regional: 'sur',
            Agency: 'dos',
            Segment: 'norte',
            RankinCountry: 3,
            RankinAgency: 3,
            RankinRegion: 3,
          }
        ],
        dateUpload: '2024-01-23'
      }
    };

    service.getReportAffiliate(mockDocument).subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/compliance-api/api/v1/DataFilteredCompliance/get-data-filtered-compliance`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ Identification: mockDocument });

    req.flush(mockResponse);
  });

  it('should call getSelector and return transformed data', () => {
    const mockResponse: ResponseBase<SelectorResponseDTO> = {
      codeId: 200,
      message: 'Success',
      data: {
        Segments: [],
        Regional: [],
        Agency: [],
        Role: []
      }
    };

    const mockTransformedData: ResponseBase<SelectorResponseModel> = {
      codeId: 200,
      message: 'Success',
      data: {
        selectors: {
          Segments: [],
          Regionals: [],
          Agencies: [],
          Rols: []
        }
      }
    };
    service.getSelector().subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/compliance-api/api/v1/FiltersCompliance/get-filters-compliance`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should call getSelectorsFinally and return transformed data', () => {
    const mockResponse: ResponseBase<SelectorResponseFDTO1> = {
      codeId: 200,
      message: 'Success',
      data: {
        filters: [
          {
            idFilter: 1,
            nameFilter: 'diciembre 2024'
          }
        ]
      }
    };

    const mockTransformedData: ResponseBase<SelectorResponseModelFinally> = {
      codeId: 200,
      message: 'Success',
      data: {
        filters: [
          {
            idFilter: 1,
            nameFilter: 'diciembre 2024'
          }
        ]
      }
    };

    service.getSelectorsFinally().subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/compliance-api/api/v1/FiltersCompliance/get-filters-compliance`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getSelectorsAgencies and return transformed data', () => {
    const mockRequestData = {
      ProgramId: 1,
      AgenciaPadre: [101, 102]
    };

    const mockResponse: ResponseBase<SelectorResponseFDTO1> = {
      codeId: 200,
      message: 'Success',
      data: {
        filters: [
          {
            idFilter: 1,
            nameFilter: 'diciembre 2024'
          }
        ]
      }
    };

    const mockTransformedData: ResponseBase<SelectorResponseModelFinally> = {
      codeId: 200,
      message: 'Success',
      data: {
        filters: [
          {
            idFilter: 1,
            nameFilter: 'diciembre 2024'
          }
        ]
      }
    };

    service.getSelectorsAgencies(mockRequestData.ProgramId, mockRequestData.AgenciaPadre).subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/compliance-api/api/v1/FinalReportCompliance/get-agency-by-regional`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequestData);

    req.flush(mockResponse);
  });

  it('should call getInfoAffiliateFinally and return transformed data', () => {
    const mockRequestData = {
      Period: 2023,
      AccountId: 101
    };

    const mockResponse: ResponseBase<compliancesResponseDTO> = {
      codeId: 200,
      message: 'Success',
      data: {
        cumplimientosInfo: [
          {
            variable: 'gaseosas',
            target: 100,
            compliance: 50,
            points: 300,
          }
        ]
      }
    };

    const mockTransformedData: ResponseBase<CompliancesModel> = {
      codeId: 200,
      message: 'Success',
      data: {
        CumplimientosInfo: [
          {
            Indicator: 'gaseosas',
            Finishline: 100,
            Compliance: 50,
            Points: 300,
          }
        ]
      }
    };


    service.getInfoAffiliateFinally(mockRequestData.Period, mockRequestData.AccountId).subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });


    const req = httpMock.expectOne(`${environment.apiUrl}/compliance-api/api/v1/FinalReportCompliance/get-data-final-report`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequestData);

    req.flush(mockResponse);
  });

  it('should call getInfoAdminFinally and return transformed data', () => {
    const mockRequestData: RequestIndicatorsAdmin = {
      Segments: ['Segment1', 'Segment2'],
      Regionals: [1, 2],
      Agencies: [101, 102],
      Rols: [],
    };

    const periodId = 2023;

    const mockResponse: ResponseBase<compliancesResponseDTO> = {
      codeId: 200,
      message: 'Success',
      data: {
        cumplimientosInfo: [
          {
            variable: 'gaseosas',
            target: 100,
            compliance: 50,
            points: 300,
          }
        ]
      }
    };

    const mockTransformedData: ResponseBase<CompliancesModel> = {
      codeId: 200,
      message: 'Success',
      data: {
        CumplimientosInfo: [
          {
            Indicator: 'gaseosas',
            Finishline: 100,
            Compliance: 50,
            Points: 300,
            ProgramId: '12345',
            Identification: '987654321',
            Role: 'Gerente',
            Regional: 'Norte',
            Agency: 'Agencia Principal',
            Segment: 'Sector Industrial',
            RankinCountry: 1,
            RankinAgency: 2,
            RankinRegion: 3
          }
        ]
      }
    };

    spyOn(ComplianceMapper, 'fromApiToDomain').and.returnValue(mockTransformedData.data);

    service.getInfoAdminFinally(periodId, mockRequestData).subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/compliance-api/api/v1/FinalReportCompliance/get-data-final-report`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      Period: periodId,
      Segment: mockRequestData.Segments,
      Regional: mockRequestData.Regionals,
      Agency: mockRequestData.Agencies
    });

    req.flush(mockResponse);
  });

  it('should call getInfoRanking and return transformed data', () => {
    const periodId = 2023;
    const idCount = 101;

    const mockResponse: ResponseBase<affiliateRankingDTO> = {
      codeId: 200,
      message: 'Success',
      data: {
        accountId: 1234,
        totalPoints: 300,
        rankingLevels: [
          {
            levelName: 'alto',
            ranking: 3
          }
        ]
      }
    };

    const mockTransformedData: ResponseBase<AffiliateRanking> = {
      codeId: 200,
      message: 'Success',
      data: {
        AccountId: 1234,
        TotalPoints: 300,
        RankingLevels: [
          {
            LevelName: 'alto',
            Ranking: 3
          }
        ]
      }
    };

    spyOn(RankingMapper, 'fromApiToDomain').and.returnValue(mockTransformedData.data);

    service.getInfoRanking(periodId, idCount).subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/compliance-api/api/v1/FinalReportCompliance/get-ranking?periodId=${periodId}&accountId=${idCount}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should call getPeriods and return transformed data', () => {
    const mockResponse: ResponseBase<periodResponseDTO[]> = {
      codeId: 200,
      message: 'Success',
      data: [
        {
          periodId: 1,
          programId: 101,
          name: 'Periodo Enero 2024',
          status: true,
          dateInitial: '2024-01-01',
          dateFinal: '2024-01-31',
          expirationDate: '2024-02-05'
        },
        {
          periodId: 2,
          programId: 101,
          name: 'Periodo Febrero 2024',
          status: true,
          dateInitial: '2024-02-01',
          dateFinal: '2024-02-28',
          expirationDate: '2024-03-05'
        },
      ]
    };

    const mockTransformedData: ResponseBase<PeriodsModel[]> = {
      codeId: 200,
      message: 'Success',
      data: [
        {
          PeriodId: 1,
          ProgramId: 101,
          Name: 'Periodo Enero 2024',
          Status: true,
          DateInitial: '2024-01-01',
          DateFinal: '2024-01-31',
          ExpirationDate: '2024-02-05'
        },
        {
          PeriodId: 2,
          ProgramId: 101,
          Name: 'Periodo Febrero 2024',
          Status: true,
          DateInitial: '2024-02-01',
          DateFinal: '2024-02-28',
          ExpirationDate: '2024-03-05'
        },
      ]
    };

    spyOn(PeriodMapper, 'fromApiToDomain').and.returnValue(mockTransformedData.data);

    service.getPeriods().subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/read-parameter-api/api/v1/period/get-periods`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });


  it('should call getSegments and return transformed data', () => {
    const mockResponse: ResponseBase<segmentResponseDTO[]> = {
      codeId: 200,
      message: 'Success',
      data: [
        {
          clusterId: 1,
          programId: 101,
          name: 'Cluster de Ejemplo',
          pointValue: 50,
          active: true
        },

      ]
    };

    const mockTransformedData: ResponseBase<SegmentsModel[]> = {
      codeId: 200,
      message: 'Success',
      data: [
        {
          ClusterId: 1,
          ProgramId: 101,
          Name: 'Cluster de Ejemplo',
          PointValue: 50,
          Active: true
        },

      ]
    };

    service.getSegments().subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/read-parameter-api/api/v1/clusters`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should call getRegional and return transformed data', () => {
    const mockResponse: ResponseBase<regionalResponseDTO[]> = {
      codeId: 200,
      message: 'Success',
      data: [
        {
          regionalId: 1,
          programId: 101,
          name: 'Cluster de Ejemplo',
          status: true
        },

      ]
    };

    const mockTransformedData: ResponseBase<RegionalModel[]> = {
      codeId: 200,
      message: 'Success',
      data: [
        {
          RegionalId: 1,
          ProgramId: 101,
          Name: 'Cluster de Ejemplo',
          Status: true
        },

      ]
    };

    service.getRegional().subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/read-parameter-api/api/v1/regional/get-regional`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });


  it('should call getAgencies and return transformed data', () => {

    const mockRequestData = [1, 2, 3];

    const mockResponse: ResponseBase<agenciesResponseDTO[]> = {
      codeId: 200,
      message: 'Success',
      data: [
        {
          agencyId: 1,
          name: 'SUR',
        },

      ]
    };

    const mockTransformedData: ResponseBase<AgenciesModel[]> = {
      codeId: 200,
      message: 'Success',
      data: [
        {
          AgencyId: 1,
          Name: 'SUR',
        },

      ]
    };

    service.getAgencies(mockRequestData).subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/read-parameter-api/api/v1/agencies/get-by-regionals`);
    expect(req.request.method).toBe('POST');

    req.flush(mockResponse);
  });

  it('should call getInfoCountAffiliateFinally and return transformed data', () => {
    const mockCountId = 12345;
    const mockResponse: ResponseBase<infoCountResponseDTO> = {
      codeId: 200,
      message: 'Success',
      data: {
        dataUser: {
          accountId: 4,
          segment: 'segmento uno',
          agency: 'agencia uno',
          regional: ['sur', 'norte']
        }
      }
    };

    const mockTransformedData: ResponseBase<InfoCountAfiliateFinallyModel> = {
      codeId: 200,
      message: 'Success',
      data: {
        dataUser: {
          AccountId: 4,
          Segment: 'segmento uno',
          Agency: 'agencia uno',
          Regional: ['sur', 'norte']
        }
      }
    };

    spyOn(AccountMapper, 'fromApiToDomain').and.callFake((data: infoCountResponseDTO) => {
      return {
        dataUser :{
          AccountId: data.dataUser.accountId,
          Segment: data.dataUser.segment,
          Agency: data.dataUser.agency,
          Regional: data.dataUser.regional
        }
      };
    });

    service.getInfoCountAffiliateFinally(mockCountId).subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/compliance-api/api/v1/FinalReportCompliance/get-data-account?AccountId=${mockCountId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });



});