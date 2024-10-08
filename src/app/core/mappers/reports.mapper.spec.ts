import { DaumDto, PaginationRuleDto, ReportsResponseDto } from "src/app/infrastructure/dto/reportsResponse.dto";
import { ReportsMapper } from "./reports.mapper";
import { DaumModel, PaginationRuleModel, ReportsResponseModel } from "../models/reportsResponse.model";
import { ErrorsReportsResponseDto } from "src/app/infrastructure/dto/errorsReportsResponse.dto";
import { ErrorsReportsResponseModel } from "../models/ErrorsReportsResponse.model";
import { UploadtypeOfCashRequestModel } from "../models/uploadTypeOfCash.model";

describe('ReportsMapper', () => {

    it('debería mapear correctamente un ReportsResponseDto a ReportsResponseModel', () => {
        const mockDto: ReportsResponseDto = {
            processes: {
                data: [{
                    redemptionProcessId: 1,
                    dateRegister: "2023-08-01",
                    processType: "type",
                    status: "Completed",
                    statusId: 123
                }],
                pagination: {
                    pageSize: 10,
                    pageNumber: 1,
                    totalElements: 20,
                    totalPages: 2
                }
            }
        };

        const result = ReportsMapper.mapResponseReportsApiToDomain(mockDto);

        expect(result).toBeInstanceOf(ReportsResponseModel);
        expect(result.Processes.Data.length).toBe(1);
        expect(result.Processes.Pagination.TotalElements).toBe(20);
    });

    it('debería mapear correctamente un DaumDto a DaumModel', () => {
        const mockDaumDto: DaumDto = {
            redemptionProcessId: 1,
            dateRegister: "2023-08-01",
            processType: "type",
            status: "Completed",
            statusId: 123
        };

        const result = ReportsMapper.mapResponseReports(mockDaumDto);

        expect(result).toBeInstanceOf(DaumModel);
        expect(result.RedemptionProcessId).toBe(1);
        expect(result.Status).toBe("Completed");
    });

    it('debería mapear correctamente un PaginationRuleDto a PaginationRuleModel', () => {
        const mockPaginationDto: PaginationRuleDto = {
            pageSize: 10,
            pageNumber: 1,
            totalElements: 20,
            totalPages: 2
        };

        const result = ReportsMapper.mapResponsePagination(mockPaginationDto);

        expect(result).toBeInstanceOf(PaginationRuleModel);
        expect(result.PageSize).toBe(10);
        expect(result.TotalPages).toBe(2);
    });


    it('debería mapear correctamente un ErrorsReportsResponseDto a ErrorsReportsResponseModel', () => {
        const mockErrorDto: ErrorsReportsResponseDto= {
            errors: {
                data: [{
                    redemptionProcessDetailId: 1,
                    errorDetail: "Error detail",
                    index: 0,
                    identificationNumber: "12345",
                    isValid: false
                }],
                pagination: {
                    pageSize: 10,
                    pageNumber: 1,
                    totalElements: 20,
                    totalPages: 2
                }
            }
        };

        const result = ReportsMapper.mapResponseErrorsReportsApiToDomain(mockErrorDto);

        expect(result).toBeInstanceOf(ErrorsReportsResponseModel);
        expect(result.Errors.Data[0].ErrorDetail).toBe("Error detail");
    });

    it('debería mapear correctamente un UploadtypeOfCashRequestModel a UploadtypeOfCashRequestDto', () => {
        const mockModel: UploadtypeOfCashRequestModel = {
          TypeOfCash: 1,
          File: {
            Name: "fileName",
            Extension: ".xlsx",
            Data: "base64data"
          }
        };
      
        const result = ReportsMapper.uploadTypeOfCashFromDomainToApi(mockModel);
      
        expect(result.typeOfCash).toBe(1);
        expect(result.file.name).toBe("fileName");
      });
      


});
