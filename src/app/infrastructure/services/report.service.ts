import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReportRepository } from '../../core/repositories/report.repository';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponseBase } from '../../core/models/responseBase.model';
import { SelectorResponseModel, SelectorResponseModel1, SelectorResponseModelFinally } from '../../core/models/selectorResponse.model';
import { SelectorResponseDTO, SelectorResponseDTO1, SelectorResponseFDTO1 } from '../dto/selectorResponse.dto';
import { SelectorMapper } from '../../core/mappers/selector.mapper';
import { RequestIndicatorsAdmin } from '../../core/models/requestIndicatorsAdmin.model';
import { IndicatorResponseDTO } from '../dto/indicatorResponse.dto';
import { IndicatorMapper } from '../../core/mappers/Indicator.mapper';
import { AffiliateRanking } from '../../core/models/UserRanking.model';
import { affiliateRankingDTO } from '../dto/rankingResponse.dto';
import { RankingMapper } from 'src/app/core/mappers/ranking.mapper';
import { PeriodsModel } from 'src/app/core/models/Periods.model';
import { periodResponseDTO } from '../dto/periodResponse.dto';
import { PeriodMapper } from 'src/app/core/mappers/period.mapper';
import { SegmentsModel } from 'src/app/core/models/Segments.model';
import { segmentResponseDTO } from '../dto/segmentResponse.dto';
import { SegmentMapper } from 'src/app/core/mappers/segment.mapper';
import { RegionalModel } from 'src/app/core/models/Regional.model';
import { regionalResponseDTO } from '../dto/regionalResponse.dto';
import { RegionalMapper } from 'src/app/core/mappers/regional.mapper';
import { AgenciesModel } from 'src/app/core/models/Agencies.model';
import { agenciesResponseDTO } from '../dto/agenciesResponse.dto';
import { AgenciesMapper } from 'src/app/core/mappers/agencies.mapper';
import { CompliancesModel } from 'src/app/core/models/Compliances.model';
import { compliancesResponseDTO } from '../dto/complianceResponse.dto';
import { ComplianceMapper } from 'src/app/core/mappers/compliance.mapper';
import { InfoCountAfiliateFinallyModel } from 'src/app/core/models/InfoCountAfiliateFinally.model';
import { infoCountResponseDTO } from '../dto/infoCountResponse.dto';

import { AccountMapper } from 'src/app/core/mappers/account.mapper';


@Injectable({
  providedIn: 'root'
})
export class ReportService implements ReportRepository {

  http = inject(HttpClient);
  private baseUrl = '/compliance-api/api/v1';



  /**
   * Obtiene un informe administrativo.
   *
   * @param document - El documento de identificación.
   * @param data - Los datos de los indicadores de solicitud administrativa.
   * @returns Un observable que emite una respuesta base con el modelo de cumplimientos.
   */
  getReportAdmin(document: string, data: RequestIndicatorsAdmin): Observable<ResponseBase<CompliancesModel>> {
    let dataSend = {
      Identification: document,
      Regional: data.Regionals,
      Agency: data.Agencies,
      Role: data.Rols,
      Segment: data.Segments
    }
    return this.http.post<ResponseBase<IndicatorResponseDTO>>(`${environment.apiUrl}${this.baseUrl}/DataFilteredCompliance/get-data-filtered-compliance`, dataSend)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: IndicatorMapper.fromApiToDomain(response.data)
          }
        })
      );
  }

  /**
   * Obtiene un informe de afiliado.
   *
   * @param document - Documento de identificación del afiliado.
   * @returns Un observable que emite una respuesta con el código de identificación, el mensaje y los datos del informe de cumplimiento.
   */
  getReportAffiliate(document: string): Observable<ResponseBase<CompliancesModel>> {
    let dataSend = {
      Identification: document.toString(),
    }

    return this.http.post<ResponseBase<IndicatorResponseDTO>>(`${environment.apiUrl}${this.baseUrl}/DataFilteredCompliance/get-data-filtered-compliance`, dataSend)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: IndicatorMapper.fromApiToDomain(response.data)
          }
        })
      );
  }

  /**
   * Obtiene el selector de cumplimiento de filtros.
   *
   * @returns Un observable que emite una respuesta con el selector de cumplimiento de filtros.
   */
  getSelector(): Observable<ResponseBase<SelectorResponseModel>> {
    return this.http.get<ResponseBase<SelectorResponseDTO>>(`${environment.apiUrl}${this.baseUrl}/FiltersCompliance/get-filters-compliance`)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: SelectorMapper.fromApiToDomain(response.data)
          }
        })
      );
  }

  /**
   * Obtiene los selectores para un tipo específico.
   *
   * @param type - El tipo de selector a obtener.
   * @returns Un observable que emite una respuesta con los selectores.
   */
  getSelectors(type: number): Observable<ResponseBase<SelectorResponseModel1>> {
    return this.http.get<ResponseBase<SelectorResponseDTO1>>(`${environment.apiUrl}${this.baseUrl}/FiltersCompliance/get-filters-compliance?type=${type}`)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: SelectorMapper.fromApiToDomain1(response.data)
          }
        })
      );
  }

  /**
   * Obtiene los selectores finales.
   *
   * @returns Un Observable que emite una instancia de ResponseBase con los datos de los selectores finales.
   */
  getSelectorsFinally(): Observable<ResponseBase<SelectorResponseModelFinally>> {
    return this.http.get<ResponseBase<SelectorResponseFDTO1>>(`${environment.apiUrl}${this.baseUrl}/FiltersCompliance/get-filters-compliance`)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: SelectorMapper.fromApiToDomainFinally(response.data)
          }
        })
      );
  }


  /**
   * Obtiene las agencias seleccionadas por programa y regionales.
   *
   * @param programId - El ID del programa.
   * @param regionals - Un arreglo de números que representan los IDs de las regionales.
   * @returns Un observable que emite una respuesta con las agencias seleccionadas.
   */
  getSelectorsAgencies(programId: number, regionals: number[]): Observable<ResponseBase<SelectorResponseModelFinally>> {
    let dataSend = {
      ProgramId: programId,
      AgenciaPadre: regionals
    }

    return this.http.post<ResponseBase<SelectorResponseFDTO1>>(`${environment.apiUrl}${this.baseUrl}/FinalReportCompliance/get-agency-by-regional`, dataSend)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: SelectorMapper.fromApiToDomainFinally(response.data)
          }
        })
      );
  }

  /**
   * Obtiene la información de cumplimiento del afiliado finalmente.
   *
   * @param period - El período de tiempo.
   * @param idCount - El ID de la cuenta.
   * @returns Un observable que emite una respuesta con el código de identificación, el mensaje y los datos de cumplimiento.
   */
  getInfoAffiliateFinally(period: number, idCount: number): Observable<ResponseBase<CompliancesModel>> {
    const dataSend = {
      Period: period,
      AccountId: idCount,
    }

    return this.http.post<ResponseBase<compliancesResponseDTO>>(`${environment.apiUrl}${this.baseUrl}/FinalReportCompliance/get-data-final-report`, dataSend)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: ComplianceMapper.fromApiToDomain(response.data)
          }
        })
      );
  }

  /**
 * Obtiene la información administrativa final.
 *
 * @param periodId - El ID del período.
 * @param data - Los datos de los indicadores administrativos.
 * @returns Un observable que emite una respuesta con el modelo de cumplimientos.
 */
  getInfoAdminFinally(periodId: number, data: RequestIndicatorsAdmin): Observable<ResponseBase<CompliancesModel>> {
    const dataSend = {
      Period: periodId,
      Segment: data.Segments,
      Regional: data.Regionals,
      Agency: data.Agencies,
    }
    return this.http.post<ResponseBase<compliancesResponseDTO>>(`${environment.apiUrl}/compliance-api/api/v1/FinalReportCompliance/get-data-final-report`, dataSend)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: ComplianceMapper.fromApiToDomain(response.data)
          }
        })
      );
  }

  /**
   * Obtiene la información de clasificación de afiliados.
   *
   * @param periodId - El ID del período.
   * @param idCount - El ID del contador.
   * @returns Un observable que emite una respuesta con la clasificación de afiliados.
   */
  getInfoRanking(periodId: number, idCount: number): Observable<ResponseBase<AffiliateRanking>> {
    return this.http.get<ResponseBase<affiliateRankingDTO>>(`${environment.apiUrl}/compliance-api/api/v1/FinalReportCompliance/get-ranking?periodId=${periodId}&accountId=${idCount}`)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: RankingMapper.fromApiToDomain(response.data)
          }
        })
      );
  }

  /**
   * Obtiene los períodos.
   *
   * @returns Un Observable que emite una respuesta que contiene un arreglo de objetos PeriodsModel.
   */
  getPeriods(): Observable<ResponseBase<PeriodsModel[]>> {
    return this.http.get<ResponseBase<periodResponseDTO[]>>(`${environment.apiUrl}/read-parameter-api/api/v1/period/get-periods`)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: PeriodMapper.fromApiToDomain(response.data ? response.data : [])
          }
        })
      );
  }

  /**
   * Obtiene los segmentos.
   *
   * @returns Un observable que emite una respuesta con un arreglo de modelos de segmentos.
   */
  getSegments(): Observable<ResponseBase<SegmentsModel[]>> {
    return this.http.get<ResponseBase<segmentResponseDTO[]>>(`${environment.apiUrl}/read-parameter-api/api/v1/clusters`)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: SegmentMapper.fromApiToDomain(response.data ? response.data : [])
          }
        })
      );
  }

  /**
   * Obtiene la información regional.
   *
   * @returns Un observable que emite una respuesta con un arreglo de modelos regionales.
   */
  getRegional(): Observable<ResponseBase<RegionalModel[]>> {
    return this.http.get<ResponseBase<regionalResponseDTO[]>>(`${environment.apiUrl}/read-parameter-api/api/v1/regional/get-regional`)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: RegionalMapper.fromApiToDomain(response.data ? response.data : [])
          }
        })
      );
  }

  /**
   * Obtiene las agencias según los identificadores de las regionales.
   * @param regionalsIds - Los identificadores de las regionales (opcional).
   * @returns Un observable que emite una respuesta con un arreglo de modelos de agencias.
   */
  getAgencies(regionalsIds: number[] = []): Observable<ResponseBase<AgenciesModel[]>> {
    return this.http.post<ResponseBase<agenciesResponseDTO[]>>(`${environment.apiUrl}/read-parameter-api/api/v1/agencies/get-by-regionals`, { regionalsIds })
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: AgenciesMapper.fromApiToDomain(response.data ? response.data : [])
          }
        })
      );
  }

  /**
   * Obtiene la información del recuento de afiliados finalmente para un ID de recuento dado.
   *
   * @param countId - El ID del recuento.
   * @returns Un observable que emite una instancia de ResponseBase con la información del recuento de afiliados finalmente.
   */
  getInfoCountAffiliateFinally(countId: number): Observable<ResponseBase<InfoCountAfiliateFinallyModel>> {
    return this.http.get<ResponseBase<infoCountResponseDTO>>(`${environment.apiUrl}/compliance-api/api/v1/FinalReportCompliance/get-data-account?AccountId=${countId}`)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: AccountMapper.fromApiToDomain(response.data)
          }
        })
      );
  }

}
