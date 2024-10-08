import { TestBed } from '@angular/core/testing';

import { TypeOrdersService } from './type-orders.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { DownloadFormatResponseModel } from 'src/app/core/models/downloadFormat.model';
import { DownloadFormatResponseDto } from '../dto/downloadFormat.dto';
import { ReportsMapper } from 'src/app/core/mappers/reports.mapper';
import { environment } from 'src/environments/environment';
import { TypeModelRequestModel } from 'src/app/core/models/typeCashRequest.model';
import { ReportsResponseDto } from '../dto/reportsResponse.dto';
import { ReportsResponseModel } from 'src/app/core/models/reportsResponse.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DetailTypeModelRequestModel } from 'src/app/core/models/detailTypeCashRequest.model';
import { ErrorsReportsResponseDto } from '../dto/errorsReportsResponse.dto';
import { ErrorsReportsResponseModel } from 'src/app/core/models/ErrorsReportsResponse.model';
import { UploadFileResponseModel, UploadtypeOfCashRequestModel } from 'src/app/core/models/uploadTypeOfCash.model';
import { UploadFileResponseDto } from '../dto/uploadPresettlement.dto';

describe('TypeOrdersService', () => {
  let service: TypeOrdersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TypeOrdersService
      ]
    });
    service = TestBed.inject(TypeOrdersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call downloadFormat and return transformed data', () => {
    const mockProgramId = 1;
    const mockConceptId = 2;

    const mockResponse: ResponseBase<DownloadFormatResponseDto> = {
      codeId: 200,
      message: 'Success',
      data: {
        parametersList: [
          {
            parameterId: 1,
            programId: 1,
            conceptId: 2,
            parameterName: 'parameter 1',
            parameterValue: 'parametervalue',
          }
        ]
      }
    };

    const mockTransformedData: ResponseBase<DownloadFormatResponseModel> = {
      codeId: 200,
      message: 'Success',
      data: {
        ParametersList: [
          {
            ParameterId: 1,
            ProgramId: 1,
            ConceptId: 2,
            ParameterName: 'parameter 1',
            ParameterValue: 'parametervalue',
          }
        ]
      }
    };

    spyOn(ReportsMapper, 'mapResponseFileReportsDataApiToDomain').and.callFake((data: DownloadFormatResponseDto) => {
      return {
        ParametersList: [
          {
            ParameterId: 1,
            ProgramId: 1,
            ConceptId: 2,
            ParameterName: 'parameter 1',
            ParameterValue: 'parametervalue',
          }
        ]
      };
    });

    service.downloadFormat(mockProgramId, mockConceptId).subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpTestingController.expectOne(`${service.apiUrlBaseUpdateFile}/api/v1/Parameters/get-list?ProgramId=${mockProgramId}&ConceptId=${mockConceptId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });


  it('should call getTypeCash and return transformed data', () => {
    const mockData: TypeModelRequestModel = {
      RedemptionProcessId: 1,
      PageNumber: 1,
      PageSize: 10
    };

    const mockResponse: ResponseBase<ReportsResponseDto> = {
      codeId: 200,
      message: 'Success',
      data: {
        processes: {
          data: [
            {
              redemptionProcessId: 1,
              dateRegister: '',
              processType: '',
              status: 'ok',
              statusId: 1
            }
          ],
          pagination: {
            pageSize: 1,
            pageNumber: 1,
            totalElements: 10,
            totalPages: 1
          }
        }
      }
    };

    const mockTransformedData: ResponseBase<ReportsResponseModel> = {
      codeId: 200,
      message: 'Success',
      data: {
        Processes: {
          Data: [
            {
              RedemptionProcessId: 1,
              DateRegister: '',
              ProcessType: '',
              Status: 'ok',
              StatusId: 1
            }
          ],
          Pagination: {
            PageSize: 1,
            PageNumber: 1,
            TotalElements: 10,
            TotalPages: 1
          }
        }
      }
    };

    spyOn(ReportsMapper, 'mapResponseReportsApiToDomain').and.callFake((data: ReportsResponseDto) => {
      return {
        Processes: {
          Data: [
            {
              RedemptionProcessId: 1,
              DateRegister: '',
              ProcessType: '',
              Status: 'ok',
              StatusId: 1
            }
          ],
          Pagination: {
            PageSize: 1,
            PageNumber: 1,
            TotalElements: 10,
            TotalPages: 1
          }
        }
      };
    });

    service.getTypeCash(mockData).subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpTestingController.expectOne(`${service.apiUrlBase}/api/v1/processes?TypeOfCash=${mockData.RedemptionProcessId}&page=${mockData.PageNumber}&pageSize=${mockData.PageSize}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should handle error response', () => {
    const mockErrorResponse = {
      codeId: 400,
      message: 'Bad Request',
      data: []
    };

    const mockData: TypeModelRequestModel = {
      RedemptionProcessId: 1,
      PageNumber: 1,
      PageSize: 10
    };

    service.getTypeCash(mockData).subscribe({
      next: () => fail('should have failed with a 400 error'),
      error: (error: ResponseBase<any>) => {
        expect(error.codeId).toEqual(400);
        expect(error.message).toEqual('Bad Request');
      }
    });

    const req = httpTestingController.expectOne(`${service.apiUrlBase}/api/v1/processes?TypeOfCash=${mockData.RedemptionProcessId}&page=${mockData.PageNumber}&pageSize=${mockData.PageSize}`);

    const mockError = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
      error: mockErrorResponse
    });

    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });

  it('should call getErrorProcessesTypeCash and return transformed data', () => {
    const mockData: DetailTypeModelRequestModel = {
      RedemptionProcessDetailId: 2,
      PageNumber: 1,
      PageSize: 10
    };

    const mockResponse: ResponseBase<ErrorsReportsResponseDto> = {
      codeId: 200,
      message: 'Success',
      data: {
        errors: {
          data: [
            {
              redemptionProcessDetailId: 1,
              errorDetail: 'error detail',
              index: 1,
              identificationNumber: 'identificaion number',
              isValid: true,
            }
          ],
          pagination: {
            pageSize: 1,
            pageNumber: 1,
            totalElements: 10,
            totalPages: 1
          }
        }
      }
    };

    const mockTransformedData: ResponseBase<ErrorsReportsResponseModel> = {
      codeId: 200,
      message: 'Success',
      data: {
        Errors: {
          Data: [
            {
              RedemptionProcessDetailId: 1,
              ErrorDetail: 'error detail',
              Index: 1,
              IdentificationNumber: 'identificaion number',
              IsValid: true,
            }
          ],
          Pagination: {
            PageSize: 1,
            PageNumber: 1,
            TotalElements: 10,
            TotalPages: 1
          }
        }
      }
    };

    spyOn(ReportsMapper, 'mapResponseErrorsReportsApiToDomain').and.callFake((data: ErrorsReportsResponseDto) => {
      return {
        Errors: {
          Data: [
            {
              RedemptionProcessDetailId: 1,
              ErrorDetail: 'error detail',
              Index: 1,
              IdentificationNumber: 'identificaion number',
              IsValid: true,
            }
          ],
          Pagination: {
            PageSize: 1,
            PageNumber: 1,
            TotalElements: 10,
            TotalPages: 1
          }
        }
      };
    });

    service.getErrorProcessesTypeCash(mockData).subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpTestingController.expectOne(`${service.apiUrlBase}/api/v1/processes/errors-details?RedemptionProcessId=${mockData.RedemptionProcessDetailId}&page=${mockData.PageNumber}&pageSize=${mockData.PageSize}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should call uploadTypeOfCash and return transformed data', () => {
    const mockRequest: UploadtypeOfCashRequestModel = {
      TypeOfCash: 3,
      File: {
        Name: 'data',
        Extension: '.xlxs',
        Data: 'datasds'
      }
    };

    const mockResponse: ResponseBase<UploadFileResponseDto> = {
      codeId: 200,
      message: 'Success',
      data: {
        redemptionProcessId: 1
      }
    };

    const mockTransformedData: ResponseBase<UploadFileResponseModel> = {
      codeId: 200,
      message: 'Success',
      data: {
       RedemptionProcessId: 1
      }
    };

    spyOn(ReportsMapper, 'uploadTypeOfCashFromDomainToApi').and.callFake((data: UploadtypeOfCashRequestModel) => {
      return {
        typeOfCash: 3,
        file:{
          name: 'data',
          extension: '.xlsx',
          data:'datasds'
        }
      };
    });

    spyOn(ReportsMapper, 'uploadFileFromApiToDomain').and.callFake((data: UploadFileResponseDto) => {
      return {
        RedemptionProcessId: 1
      };
    });

    service.uploadTypeOfCash(mockRequest).subscribe((response) => {
      expect(response).toEqual(mockTransformedData);
    });

    const req = httpTestingController.expectOne(`${service.apiUrlBaseUpdate}/api/v1/processes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      typeOfCash: 3,
      file: {
        name: 'data',
        extension: '.xlsx',
        data: 'datasds'
      }
    });

    req.flush(mockResponse);
  });

});
