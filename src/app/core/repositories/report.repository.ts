import { Observable } from 'rxjs';
import { ResponseBase } from '../models/responseBase.model';
import { SelectorResponseModel, SelectorResponseModel1, SelectorResponseModelFinally } from '../models/selectorResponse.model';
import { RequestIndicatorsAdmin } from '../models/requestIndicatorsAdmin.model';
import { AffiliateRanking } from '../models/UserRanking.model';
import { PeriodsModel } from '../models/Periods.model';
import { SegmentsModel } from '../models/Segments.model';
import { RegionalModel } from '../models/Regional.model';
import { AgenciesModel } from '../models/Agencies.model';
import { CompliancesModel } from '../models/Compliances.model';
import { InfoCountAfiliateFinallyModel } from '../models/InfoCountAfiliateFinally.model';

export abstract class ReportRepository {

  /**
 * Obtiene el selector.
 * @returns {Observable<ResponseBase<SelectorResponseModel>>} Un observable con la respuesta del selector.
 */
  abstract getSelector(): Observable<ResponseBase<SelectorResponseModel>>

  /**
 * Obtiene los selectores según el tipo.
 * @param {number} type - El tipo de selector.
 * @returns {Observable<ResponseBase<SelectorResponseModel1>>} Un observable con la respuesta de los selectores.
 */
  abstract getSelectors(type: number): Observable<ResponseBase<SelectorResponseModel1>>

  /**
 * Obtiene los selectores finales.
 * @returns {Observable<ResponseBase<SelectorResponseModelFinally>>} Un observable con la respuesta de los selectores finales.
 */
  abstract getSelectorsFinally(): Observable<ResponseBase<SelectorResponseModelFinally>>

  /**
 * Obtiene los selectores de agencias según el programa y las regionales.
 * @param {number} programId - El ID del programa.
 * @param {number[]} regionals - Los IDs de las regionales.
 * @returns {Observable<ResponseBase<SelectorResponseModelFinally>>} Un observable con la respuesta de los selectores de agencias.
 */
  abstract getSelectorsAgencies(programId: number, regionals: number[]): Observable<ResponseBase<SelectorResponseModelFinally>>

  /**
 * Obtiene el reporte administrativo.
 * @param {string} document - El documento.
 * @param {RequestIndicatorsAdmin} data - Los datos de la solicitud de indicadores administrativos.
 * @returns {Observable<ResponseBase<CompliancesModel>>} Un observable con la respuesta del reporte administrativo.
 */
  abstract getReportAdmin(document: string, data: RequestIndicatorsAdmin): Observable<ResponseBase<CompliancesModel>>

  /**
 * Obtiene el reporte de afiliado.
 * @param {string} document - El documento del afiliado.
 * @returns {Observable<ResponseBase<CompliancesModel>>} Un observable con la respuesta del reporte de afiliado.
 */
  abstract getReportAffiliate(document: string): Observable<ResponseBase<CompliancesModel>>

  /**
 * Obtiene la información del ranking.
 * @param {number} periodId - El ID del periodo.
 * @param {number} idCount - El ID del conteo.
 * @returns {Observable<ResponseBase<AffiliateRanking>>} Un observable con la respuesta de la información del ranking.
 */
  abstract getInfoRanking(periodId: number, idCount: number): Observable<ResponseBase<AffiliateRanking>>

  /**
 * Obtiene los periodos.
 * @returns {Observable<ResponseBase<PeriodsModel[]>>} Un observable con la respuesta de los periodos.
 */
  abstract getPeriods(): Observable<ResponseBase<PeriodsModel[]>>

  /**
 * Obtiene los segmentos.
 * @returns {Observable<ResponseBase<SegmentsModel[]>>} Un observable con la respuesta de los segmentos.
 */
  abstract getSegments(): Observable<ResponseBase<SegmentsModel[]>>

  /**
 * Obtiene las regionales.
 * @returns {Observable<ResponseBase<RegionalModel[]>>} Un observable con la respuesta de las regionales.
 */
  abstract getRegional(): Observable<ResponseBase<RegionalModel[]>>

  /**
 * Obtiene las agencias según las regionales.
 * @param {number[]} [regionalsIds] - Los IDs de las regionales (opcional).
 * @returns {Observable<ResponseBase<AgenciesModel[]>>} Un observable con la respuesta de las agencias.
 */
  abstract getAgencies(regionalsIds?: number[]): Observable<ResponseBase<AgenciesModel[]>>

  /**
 * Obtiene la información administrativa final.
 * @param {number} periodId - El ID del periodo.
 * @param {RequestIndicatorsAdmin} data - Los datos de la solicitud de indicadores administrativos.
 * @returns {Observable<ResponseBase<CompliancesModel>>} Un observable con la respuesta de la información administrativa final.
 */
  abstract getInfoAdminFinally(periodId: number, data: RequestIndicatorsAdmin): Observable<ResponseBase<CompliancesModel>>

  /**
 * Obtiene la información final del afiliado.
 * @param {number} period - El periodo.
 * @param {number} idCount - El ID del conteo.
 * @returns {Observable<ResponseBase<CompliancesModel>>} Un observable con la respuesta de la información final del afiliado.
 */
  abstract getInfoAffiliateFinally(period: number, idCount: number,): Observable<ResponseBase<CompliancesModel>>

  /**
 * Obtiene la información final del conteo de afiliados.
 * @param {number} idCount - El ID del conteo.
 * @returns {Observable<ResponseBase<InfoCountAfiliateFinallyModel>>} Un observable con la respuesta de la información final del conteo de afiliados.
 */
  abstract getInfoCountAffiliateFinally(idCount: number,): Observable<ResponseBase<InfoCountAfiliateFinallyModel>>

}
