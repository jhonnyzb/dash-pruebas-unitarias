import { Observable } from "rxjs";
import { ResponseBase } from '../models/responseBase.model'
import { ReportsResponseModel } from "../models/reportsResponse.model";
import { ErrorsReportsResponseModel } from "../models/ErrorsReportsResponse.model";
import { UploadFileResponseModel, UploadtypeOfCashRequestModel } from "../models/uploadTypeOfCash.model";
import { DownloadFormatResponseModel } from "../models/downloadFormat.model";
import { TypeModelRequestModel } from "../models/typeCashRequest.model";
import { DetailTypeModelRequestModel } from "../models/detailTypeCashRequest.model";

export abstract class ReportsRepository {

  /**
 * Obtiene el tipo de efectivo.
 *
 * @param data - Modelo de solicitud del tipo de modelo.
 * @returns Observable que emite una respuesta base con el modelo de respuesta de informes.
 */
  abstract getTypeCash(data: TypeModelRequestModel): Observable<ResponseBase<ReportsResponseModel>>;

  /**
 * Obtiene los errores de los procesos del tipo de efectivo.
 *
 * @param data - Modelo de solicitud del detalle del tipo de modelo.
 * @returns Observable que emite una respuesta base con el modelo de respuesta de errores de informes.
 */
  abstract getErrorProcessesTypeCash(data: DetailTypeModelRequestModel): Observable<ResponseBase<ErrorsReportsResponseModel>>;

  /**
 * Sube el tipo de efectivo.
 *
 * @param requestModel - Modelo de solicitud para subir el tipo de efectivo.
 * @returns Observable que emite una respuesta base con el modelo de respuesta de archivo subido.
 */
  abstract uploadTypeOfCash(requestModel: UploadtypeOfCashRequestModel): Observable<ResponseBase<UploadFileResponseModel>>;

  /**
 * Descarga el formato.
 *
 * @param ProgramId - Identificador del programa.
 * @param ConceptId - Identificador del concepto.
 * @returns Observable que emite una respuesta base con el modelo de respuesta del formato descargado.
 */
  abstract downloadFormat(ProgramId: number, ConceptId: number): Observable<ResponseBase<DownloadFormatResponseModel>>;


}
