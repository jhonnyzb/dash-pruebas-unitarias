import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { ErrorResponseModel } from 'src/app/core/models/responseError.model';
import { ReportsMapper } from 'src/app/core/mappers/reports.mapper';
import { ReportsResponseDto } from '../dto/reportsResponse.dto';
import { ReportsResponseModel } from 'src/app/core/models/reportsResponse.model';
import { ReportsRepository } from 'src/app/core/repositories/reportsCash.respository';
import { ErrorsReportsResponseDto } from '../dto/errorsReportsResponse.dto';
import { ErrorsReportsResponseModel } from 'src/app/core/models/ErrorsReportsResponse.model';
import { UploadFileResponseModel, UploadtypeOfCashRequestModel } from 'src/app/core/models/uploadTypeOfCash.model';
import { UploadFileResponseDto } from '../dto/uploadPresettlement.dto';
import { DownloadFormatResponseModel } from 'src/app/core/models/downloadFormat.model';
import { DownloadFormatResponseDto } from '../dto/downloadFormat.dto';
import { TypeModelRequestModel } from 'src/app/core/models/typeCashRequest.model';
import { DetailTypeModelRequestModel } from 'src/app/core/models/detailTypeCashRequest.model';




@Injectable({
  providedIn: 'root'
})
export class TypeOrdersService implements ReportsRepository {

  apiUrlBase = `${environment.apiUrl}/redemption-api`;
  apiUrlBaseUpdate = `${environment.apiUrl}/redemption-api`;
  apiUrlBaseUpdateFile = `${environment.apiUrl}/program-api`;


  constructor(private http: HttpClient) { }



  /**
   * Descarga un formato específico.
   *
   * @param ProgramId - El ID del programa.
   * @param ConceptId - El ID del concepto.
   * @returns Un observable que emite una respuesta con el formato descargado.
   * @throws Un error si la solicitud de descarga falla.
   */
  downloadFormat(ProgramId: number, ConceptId: number): Observable<ResponseBase<DownloadFormatResponseModel>> {
    return this.http.get<ResponseBase<DownloadFormatResponseDto>>(`${this.apiUrlBaseUpdateFile}/api/v1/Parameters/get-list?ProgramId=${ProgramId}&ConceptId=${ConceptId}`)
      .pipe(
        map((result: ResponseBase<DownloadFormatResponseDto>) => ({
          codeId: result.codeId,
          message: result.message,
          data: ReportsMapper.mapResponseFileReportsDataApiToDomain(result.data)
        })),
        catchError((error: HttpErrorResponse) => {
          const errorResponse: ResponseBase<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.message,
            data: error.error.data
          };
          return throwError(() => errorResponse);
        })
      );
  }


  /**
   * Obtiene el tipo de efectivo.
   *
   * @param data - El modelo de solicitud de tipo.
   * @returns Un observable que emite una respuesta base con el modelo de respuesta de informes.
   * @throws Un error si la solicitud no se puede completar.
   */
  getTypeCash(data: TypeModelRequestModel): Observable<ResponseBase<ReportsResponseModel>> {
    return this.http.get<ResponseBase<ReportsResponseDto>>(`${this.apiUrlBase}/api/v1/processes?TypeOfCash=${data.RedemptionProcessId}&page=${data.PageNumber}&pageSize=${data.PageSize}`)
      .pipe(
        map((result: ResponseBase<ReportsResponseDto>) => ({
          codeId: result.codeId,
          message: result.message,
          data: ReportsMapper.mapResponseReportsApiToDomain(result.data)
        }
        )),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBase<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.message,
            data: error.error.data
          }
          return throwError(() => errorResponse);
        })
      );
  }


  /**
   * Obtiene los procesos de error de tipo efectivo.
   *
   * @param data - Los datos de la solicitud del modelo de tipo de detalle.
   * @returns Un observable que emite una respuesta base con el modelo de respuesta de los informes de errores.
   * @throws Devuelve un observable que emite una respuesta base con el modelo de respuesta de error en caso de error de red.
   */
  getErrorProcessesTypeCash(data: DetailTypeModelRequestModel): Observable<ResponseBase<ErrorsReportsResponseModel>> {
    return this.http.get<ResponseBase<ErrorsReportsResponseDto>>(`${this.apiUrlBase}/api/v1/processes/errors-details?RedemptionProcessId=${data.RedemptionProcessDetailId}&page=${data.PageNumber}&pageSize=${data.PageSize}`)
      .pipe(
        map((result: ResponseBase<ErrorsReportsResponseDto>) => ({
          codeId: result.codeId,
          message: result.message,
          data: ReportsMapper.mapResponseErrorsReportsApiToDomain(result.data)
        }
        )),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBase<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.message,
            data: error.error.data
          }
          return throwError(() => errorResponse);
        })
      );
  }


  /**
   * Sube el tipo de efectivo.
   *
   * @param requestModel - El modelo de solicitud para subir el tipo de efectivo.
   * @returns Un observable que emite una respuesta base con el modelo de respuesta de carga de archivo.
   * @throws Un error si ocurre un error durante la solicitud HTTP.
   */
  uploadTypeOfCash(requestModel: UploadtypeOfCashRequestModel): Observable<ResponseBase<UploadFileResponseModel>> {
    let request = ReportsMapper.uploadTypeOfCashFromDomainToApi(requestModel);
    return this.http.post<ResponseBase<UploadFileResponseDto>>(`${this.apiUrlBaseUpdate}/api/v1/processes`, request)
      .pipe(
        map((data: ResponseBase<UploadFileResponseDto>) => ({
          codeId: data.codeId,
          message: data.message,
          data: ReportsMapper.uploadFileFromApiToDomain(data.data)
        }
        )),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBase<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.Message,
            data: error.error.Data
          }
          return throwError(() => errorResponse);
        })
      );
  }



}
