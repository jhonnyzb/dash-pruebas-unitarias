import { Component, OnInit } from '@angular/core';
import { ReportRepository } from '../../../core/repositories/report.repository';
import { getSession } from '../../../utils/storage';
import { SelectorResponseModel } from '../../../core/models/selectorResponse.model';

import { CompliancesInfoModel } from 'src/app/core/models/Compliances.model';

@Component({
  selector: 'app-monitoring-report',
  templateUrl: './monitoring-report.component.html'
})
export class MonitoringReportComponent implements OnInit {


  indicators: CompliancesInfoModel[] = [{ Indicator: 'Indicador 1', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 2', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 3', Finishline: 0, Compliance: 0, Points: 0 }];
  typeReport: string = 'seguimiento';
  selectors: SelectorResponseModel = { selectors: { Segments: [], Agencies: [], Regionals: [], Rols: [] } };
  pointsTotal: number = 0
  document: string = '';
  program: number = 0
  dateReport: string | undefined = ''
  ranking = {};
  information = {};
  user: any = {};

  constructor(private reportRepository: ReportRepository) { }

  async ngOnInit() {
    this.getDataUser();
  }

  /**
   * Obtiene los datos del usuario actual.
   *
   * @returns {void}
   */
  getDataUser() {
    const userDataAdmin = getSession<any>('userLoginData', 'admin');
    const userDataAffiliate = getSession<any>('userData', 'affiliate');
    const names = getSession<any>('accountValepro', 'affiliate');
    const typeUser = userDataAdmin ? 'admin' : 'affiliate';
    const configVisual = getSession<any>('configVisual', typeUser);
    const userData = userDataAdmin || userDataAffiliate;

    if (typeUser === 'admin') {
      this.program = userData.programId
      this.document = ''
    }
    if (userData) {
      const userInfo = {
        name: typeUser === 'admin' ? `${userData.name} ${userData.lastName}` : names ? names.Name + ' ' + names.LastName : '--',
        typeUser,
        img: typeUser === 'admin' ? configVisual.imageBackgroundLogin : configVisual.ImageBackgroundLogin
      };
      this.user = userInfo;
    }
    if (typeUser === 'admin') {
      this.getSelectors();
    }
    if (typeUser === 'affiliate') {
      this.getReportAffiliate(userData.person.identificationNumber);
    }
  }

  /**
   * Obtiene los selectores de segmentos, regionales, agencias y roles.
   *
   * @returns Una promesa que se resuelve con los selectores obtenidos.
   * @throws Si ocurre un error al obtener los selectores.
   */
  async getSelectors() {
    let segmentos: string[] = [];
    let regionales: string[] = [];
    let agencias: string[] = [];
    let roles: string[] = [];
    try {
      const seg = await this.reportRepository.getSelectors(1).toPromise();
      segmentos = seg!.data.selectors;
      const reg = await this.reportRepository.getSelectors(2).toPromise();
      regionales = reg!.data.selectors;
      const agen = await this.reportRepository.getSelectors(3).toPromise();
      agencias = agen!.data.selectors;
      this.selectors = { selectors: { Segments: segmentos, Agencies: agencias, Regionals: regionales, Rols: roles } }
    } catch (error) {
      this.selectors = {
        selectors: { Segments: [], Agencies: [], Regionals: [], Rols: [] }
      };
    }
  }

  /**
   * Obtiene el informe de administrador.
   *
   * @param event - El evento que contiene los parámetros de consulta para el informe.
   *   - Segments: Los segmentos a considerar en la consulta.
   *   - Regionals: Las regiones a considerar en la consulta.
   *   - Agencies: Las agencias a considerar en la consulta.
   *   - Rols: Los roles a considerar en la consulta.
   * @returns Una suscripción al informe de administrador.
   */
  getReportAdmin(event: any) {
    const { Segments, Regionals, Agencies, Rols } = event;

    this.reportRepository.getReportAdmin(this.document, { Segments, Regionals, Agencies, Rols }).subscribe({
      next: (resp) => {
        if (resp.data.CumplimientosInfo.length === 0) {
          this.indicators = [{ Indicator: 'Indicador 1', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 2', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 3', Finishline: 0, Compliance: 0, Points: 0 }];
          return;
        }
        this.indicators = resp.data.CumplimientosInfo.map((item, _) => {
          return {
            Indicator: item.Indicator,
            Finishline: item.Finishline,
            Compliance: item.Compliance,
            Points: item.Points.toString()
          }
        })
        this.dateReport = resp.data.dateUpload;
      },
      error: (error) => {
        this.indicators = [{ Indicator: 'Indicador 1', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 2', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 3', Finishline: 0, Compliance: 0, Points: 0 }];
      }
    })
  }

  /**
   * Obtiene el informe de un afiliado.
   *
   * @param document - Documento del afiliado.
   */
  getReportAffiliate(document: string) {
    this.reportRepository.getReportAffiliate(document).subscribe({
      next: (resp) => {
        if (resp.data.CumplimientosInfo.length === 0) {
          this.indicators = [{ Indicator: 'Indicador 1', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 2', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 3', Finishline: 0, Compliance: 0, Points: 0 }];
          this.information = {
            force: '--',
            regional: '--',
            cedi: '--',
            cargo: '--'
          }
          return;
        }
        this.indicators = resp.data.CumplimientosInfo;
        this.dateReport = resp.data.dateUpload;
        this.ranking = {
          rankingPais: resp.data.CumplimientosInfo[0].RankinCountry ? resp.data.CumplimientosInfo[0].RankinCountry : 0,
          rankingAgencia: resp.data.CumplimientosInfo[0].RankinAgency ? resp.data.CumplimientosInfo[0].RankinAgency : 0,
          rankingRegion: resp.data.CumplimientosInfo[0].RankinRegion ? resp.data.CumplimientosInfo[0].RankinRegion : 0
        }
        this.information = {
          force: resp.data.CumplimientosInfo[0].Segment ? resp.data.CumplimientosInfo[0].Segment : '--',
          regional: resp.data.CumplimientosInfo[0].Regional ? resp.data.CumplimientosInfo[0].Regional : '--',
          cedi: resp.data.CumplimientosInfo[0].Agency ? resp.data.CumplimientosInfo[0].Agency : '--',
          cargo: resp.data.CumplimientosInfo[0].Role ? resp.data.CumplimientosInfo[0].Role : '--'
        }
        this.pointsTotal = resp.data.CumplimientosInfo.reduce((acumulador, object) => {
          return acumulador + Number(object.Points);
        }, 0);
      },
      error: (error) => {
        this.indicators = [{ Indicator: 'Indicador 1', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 2', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 3', Finishline: 0, Compliance: 0, Points: 0 }];
        this.information = { force: '--', regional: '--', cedi: '--', cargo: '--' }
        this.pointsTotal = 0;
      }
    })
  }
}
