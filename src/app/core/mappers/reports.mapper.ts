import { FileRequestDto, UploadFileResponseDto, UploadtypeOfCashRequestDto } from './../../infrastructure/dto/uploadPresettlement.dto';
import { DaumDto, PaginationRuleDto, ProcessesDto, ReportsResponseDto } from "src/app/infrastructure/dto/reportsResponse.dto";
import { DaumModel, PaginationRuleModel, ProcessesModel, ReportsResponseModel } from "../models/reportsResponse.model";
import { DaumErrorsDto, ErrorsDto, ErrorsReportsResponseDto, PaginationErrorsRuleDto } from "src/app/infrastructure/dto/errorsReportsResponse.dto";

import { ErrorsReportsResponseModel } from "../models/ErrorsReportsResponse.model";
import { ErrorsModel } from "../models/ErrorsReportsResponse.model";
import { DaumErrorsModel } from "../models/ErrorsReportsResponse.model";
import { PaginationErrorsRuleModel } from "../models/ErrorsReportsResponse.model";
import { FileRequestModel, UploadFileResponseModel, UploadtypeOfCashRequestModel } from "../models/uploadTypeOfCash.model";
import { DownloadFormatResponseDto, ParameterDto } from 'src/app/infrastructure/dto/downloadFormat.dto';
import { DownloadFormatResponseModel, ParameterModel } from '../models/downloadFormat.model';
import { TypeModelRequestModel } from '../models/typeCashRequest.model';
import { TypeModelRequestDto } from 'src/app/infrastructure/dto/TypeModelRequest.dto';

export class ReportsMapper {


  /**
   * Convierte un objeto DTO de respuesta de informes en un modelo de respuesta de informes del dominio.
   *
   * @param dto - El objeto DTO de respuesta de informes a mapear.
   * @returns El modelo de respuesta de informes del dominio.
   */
  static mapResponseReportsApiToDomain(dto: ReportsResponseDto): ReportsResponseModel {
    return new ReportsResponseModel(this.mapResponseReportsDataApiToDomain(dto.processes))
  }

  /**
   * Convierte los datos de respuesta de la API en un objeto de dominio de ProcessesModel.
   * @param dto - Los datos de respuesta de la API a mapear.
   * @returns Un objeto ProcessesModel que representa los datos de respuesta mapeados.
   */
  static mapResponseReportsDataApiToDomain(dto: ProcessesDto): ProcessesModel {
    return new ProcessesModel(
      dto.data.length > 0 ? dto.data.map((variable) => this.mapResponseReports(variable)) : [], this.mapResponsePagination(dto.pagination))
  }


  /**
   * Mapea un objeto DTO de Daum a un objeto modelo de Daum.
   *
   * @param dto - El objeto DTO de Daum a mapear.
   * @returns El objeto modelo de Daum mapeado.
   */
  static mapResponseReports(dto: DaumDto): DaumModel {
    return new DaumModel(
      dto.redemptionProcessId,
      dto.dateRegister,
      dto.processType,
      dto.status,
      dto.statusId)
  }


  /**
   * Mapea un objeto de tipo PaginationRuleDto a un objeto de tipo PaginationRuleModel.
   *
   * @param dto - El objeto de tipo PaginationRuleDto a mapear.
   * @returns El objeto de tipo PaginationRuleModel mapeado.
   */
  static mapResponsePagination(dto: PaginationRuleDto): PaginationRuleModel {
    return new PaginationRuleModel(
      dto.pageSize,
      dto.pageNumber,
      dto.totalElements,
      dto.totalPages)
  }


  ////////////////////mapeo de errores en tipo de cash ////////////////////////


  /**
   * Mapea los errores de respuesta de la API de informes al dominio de la respuesta de errores de informes.
   *
   * @param dto - El objeto DTO de la respuesta de errores de informes.
   * @returns El modelo de respuesta de errores de informes mapeado al dominio.
   */
  static mapResponseErrorsReportsApiToDomain(dto: ErrorsReportsResponseDto): ErrorsReportsResponseModel {
    return new ErrorsReportsResponseModel(this.mapResponseErrorsReportsDataApiToDomain(dto.errors))
  }

  /**
   * Mapea los errores de respuesta de la API de datos a un modelo de errores del dominio.
   *
   * @param dto - El objeto DTO que contiene los datos de los errores de respuesta.
   * @returns Un objeto de tipo ErrorsModel que representa los errores mapeados del dominio.
   */
  static mapResponseErrorsReportsDataApiToDomain(dto: ErrorsDto): ErrorsModel {
    return new ErrorsModel(
      dto.data.length > 0 ? dto.data.map((variable) => this.mapResponseErrorsReports(variable)) : [], this.mapResponsePagination(dto.pagination))
  }


  /**
   * Mapea los errores de respuesta del DTO a un modelo de errores de Daum.
   *
   * @param dto - El objeto DTO que contiene los errores de respuesta.
   * @returns El modelo de errores de Daum mapeado.
   */
  static mapResponseErrorsReports(dto: DaumErrorsDto): DaumErrorsModel {
    return new DaumErrorsModel(
      dto.redemptionProcessDetailId,
      dto.errorDetail,
      dto.index,
      dto.identificationNumber,
      dto.isValid
    )
  }

  /**
   * Mapea los errores de respuesta de la paginación de un DTO a un modelo de reglas de errores de paginación.
   *
   * @param dto - El DTO de reglas de errores de paginación a mapear.
   * @returns El modelo de reglas de errores de paginación mapeado.
   */
  static mapResponseErrorsPagination(dto: PaginationErrorsRuleDto): PaginationErrorsRuleModel {
    return new PaginationErrorsRuleModel(
      dto.pageSize,
      dto.pageNumber,
      dto.totalElements,
      dto.totalPages)
  }


  /////////////////////////// mapeo de upload de archivo //////////////////////


  /**
   * Convierte un modelo de solicitud de tipo de efectivo del dominio a un DTO de solicitud de tipo de efectivo para la API.
   *
   * @param model - El modelo de solicitud de tipo de efectivo del dominio.
   * @returns El DTO de solicitud de tipo de efectivo para la API.
   */
  static uploadTypeOfCashFromDomainToApi(model: UploadtypeOfCashRequestModel): UploadtypeOfCashRequestDto {
    return {
      typeOfCash: model.TypeOfCash,
      file: ReportsMapper.uploadTypeOfCashFileFromDomainToApi(model.File)
    };
  }

  /**
   * Convierte un modelo de solicitud de archivo de dominio en un DTO de solicitud de archivo.
   *
   * @param model - El modelo de solicitud de archivo de dominio.
   * @returns El DTO de solicitud de archivo.
   */
  static uploadTypeOfCashFileFromDomainToApi(model: FileRequestModel): FileRequestDto {
    return {
      name: model.Name,
      extension: model.Extension,
      data: model.Data
    };
  }

  /**
   * Convierte un objeto DTO de solicitud de tipo de efectivo de la API en un modelo de solicitud de tipo de efectivo del dominio.
   *
   * @param dto - El objeto DTO de solicitud de tipo de efectivo de la API.
   * @returns El modelo de solicitud de tipo de efectivo del dominio.
   */
  static uploadTypeOfCashFromApiToDomain(dto: UploadtypeOfCashRequestDto): UploadtypeOfCashRequestModel {
    return new UploadtypeOfCashRequestModel(
      dto.typeOfCash,
      ReportsMapper.uploadTypeOfCashFileFromApiToDomain(dto.file)
    );
  }

  /**
   * Convierte un objeto de tipo FileRequestDto en un objeto de tipo FileRequestModel.
   *
   * @param dto - El objeto de tipo FileRequestDto que se va a convertir.
   * @returns El objeto de tipo FileRequestModel convertido.
   */
  static uploadTypeOfCashFileFromApiToDomain(dto: FileRequestDto): FileRequestModel {
    return new FileRequestModel(
      dto.name,
      dto.extension,
      dto.data
    );
  }



  /**
   * Convierte un objeto de tipo UploadFileResponseDto en un objeto de tipo UploadFileResponseModel.
   *
   * @param dto - El objeto de tipo UploadFileResponseDto que se va a convertir.
   * @returns El objeto de tipo UploadFileResponseModel convertido.
   */
  static uploadFileFromApiToDomain(dto: UploadFileResponseDto): UploadFileResponseModel {
    return {
      RedemptionProcessId: dto.redemptionProcessId
    }
  }


  ///////////////////////// upload file to domain ////////////////


  /**
   * Convierte los datos de respuesta de la API en un modelo de respuesta de formato de descarga.
   *
   * @param dto - El objeto DTO que contiene los datos de respuesta de la API.
   * @returns El modelo de respuesta de formato de descarga.
   */
  static mapResponseFileReportsDataApiToDomain(dto: DownloadFormatResponseDto): DownloadFormatResponseModel {
    return new DownloadFormatResponseModel(
      dto.parametersList.length > 0
        ? dto.parametersList.map((variable: ParameterDto) => this.mapResponseFilesBIReports(variable))
        : []
    );
  }

  /**
   * Mapea los datos de un objeto ParameterDto a un objeto ParameterModel.
   *
   * @param dto - El objeto ParameterDto que se va a mapear.
   * @returns El objeto ParameterModel mapeado.
   */
  static mapResponseFilesBIReports(dto: ParameterDto): ParameterModel {
    return new ParameterModel(
      dto.parameterId,
      dto.programId,
      dto.conceptId,
      dto.parameterName,
      dto.parameterValue
    );
  }

  ///////////////////////////////////////////////

  /**
   * Convierte un objeto de dominio de tipo TypeModelRequestModel a un objeto de tipo TypeModelRequestDto para la API.
   *
   * @param data - El objeto de dominio de tipo TypeModelRequestModel a convertir.
   * @returns El objeto de tipo TypeModelRequestDto convertido.
   */
  static fromDomainToApiTypeCash(data: TypeModelRequestModel): TypeModelRequestDto {
    return {
      redemptionProcessId: data.RedemptionProcessId,
      pageNumber: data.PageNumber,
      pageSize: data.PageSize

    }
  }

}
