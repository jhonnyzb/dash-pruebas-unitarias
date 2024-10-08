import { Component, OnInit } from '@angular/core';
import { getSession } from '../../../utils/storage';
import { ReportRepository } from '../../../core/repositories/report.repository';
import { SelectorResponseModelF } from '../../../core/models/selectorResponse.model';
import { PeriodsModel } from 'src/app/core/models/Periods.model';
import { SegmentsModel } from 'src/app/core/models/Segments.model';
import { RegionalModel } from 'src/app/core/models/Regional.model';
import { AgenciesModel } from 'src/app/core/models/Agencies.model';
import { CompliancesInfoModel } from 'src/app/core/models/Compliances.model';

@Component({
  selector: 'app-finally-report',
  templateUrl: './finally-report.component.html'
})
export class FinallyReportComponent implements OnInit {

  indicators: CompliancesInfoModel[] = [{ Indicator: 'Indicador 1', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 2', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 3', Finishline: 0, Compliance: 0, Points: 0 }];
  typeReport: string = 'final';
  user: any = {};
  information = {};
  periodSend: number = 0;
  pointsTotal: number = 0;
  ranking = {};
  isSelectPeriod: string = '';

  periods: PeriodsModel[] = [];
  segmentos: SegmentsModel[] = [];
  regionales: RegionalModel[] = [];
  agencias: AgenciesModel[] = [];
  roles: SelectorResponseModelF[] = [];

  Segment: number[] = [];
  Regional: number[] = [];
  Agency: number[] = [];
  Role: number[] = [];

  constructor(private reportRepository: ReportRepository) { }

  ngOnInit(): void {
    this.getDataUser();
  }

  /**
  * Obtiene los datos del usuario.
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

    if (userData) {
      const userInfo = {
        name: typeUser === 'admin' ? `${userData.name} ${userData.lastName}` : names ? names.Name + ' ' + names.LastName : '--',
        typeUser,
        img: typeUser === 'admin' ? configVisual.imageBackgroundLogin : configVisual.ImageBackgroundLogin,
        programId: typeUser === 'admin' ? userData.programId : userData.IDPrograma,
        countId: typeUser === 'admin' ? userData.accountId : userData.accountId
      };
      this.user = userInfo;
    }
    if (typeUser === 'admin') {
      this.getSelectorsAdmin();
    }
    if (typeUser === 'affiliate') {
      this.getSelectorsAffiliate();
      this.getInfoAccount();
    }
  }

  /**
   * Obtiene los selectores de administrador.
   *
   * @returns {void}
   */
  getSelectorsAdmin() {
    this.reportRepository.getPeriods().subscribe({
      next: (resp) => {
        this.periods = resp.data;
      },
      error: (error) => {
        this.periods = [];
      }
    })

    this.reportRepository.getSegments().subscribe({
      next: (resp) => {
        this.segmentos = resp.data;
      },
      error: (error) => {
        this.segmentos = [];
      }
    })

    this.reportRepository.getRegional().subscribe({
      next: (resp) => {
        this.regionales = resp.data;
      },
      error: (error) => {
        this.regionales = [];
      }
    })

    this.reportRepository.getAgencies().subscribe({
      next: (resp) => {
        this.agencias = resp.data
      },
      error: (error) => {
        this.agencias = [];
      }
    })
  }

  /**
   * Obtiene los selectores de afiliados.
   *
   * @returns {Promise<void>} Una promesa que se resuelve cuando se obtienen los selectores de afiliados.
   * @throws {Error} Si ocurre un error al obtener los selectores de afiliados.
   */
  async getSelectorsAffiliate() {
    try {
      this.reportRepository.getPeriods().subscribe({
        next: (resp) => {
          this.periods = resp.data;
        },
        error: (error) => {
          this.periods = [];
        }
      })
    } catch (error) {
      this.periods = [];
    }
  }

  /**
 * Obtiene la información del afiliado.
 *
 * @param periodSend - El período de envío.
 * @param countId - El ID del usuario.
 * @returns Un observable que emite la respuesta con la información del afiliado.
 */
  getInfoAffiliate() {
    const { countId } = this.user;
    this.reportRepository.getInfoAffiliateFinally(this.periodSend, countId).subscribe({
      next: (resp) => {
        if (resp.data.CumplimientosInfo.length === 0) {
          this.indicators = [{ Indicator: 'Indicador 1', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 2', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 3', Finishline: 0, Compliance: 0, Points: 0 }];
          return;
        }
        this.indicators = resp.data.CumplimientosInfo;
      },
      error: (error) => {
        this.indicators = [{ Indicator: 'Indicador 1', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 2', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 3', Finishline: 0, Compliance: 0, Points: 0 }];
      }
    })
  }


  /**
   * Obtiene las agencias correspondientes a las regionales especificadas.
   *
   * @param regionals - Un arreglo de números que representan las regionales.
   * @returns Una subscripción que emite la respuesta con los datos de las agencias.
   */
  getAgencies(regionals: number[]) {
    this.Regional = regionals;
    this.reportRepository.getAgencies(regionals).subscribe({
      next: (resp) => {
        this.agencias = resp.data
      },
      error: (error) => {
        this.agencias = [];
      }
    })
    this.getInfoAdmin();
  }

  /**
   * Obtiene la información del período seleccionado.
   *
   * @param period - El período seleccionado.
   */
  getInfoPeriod(period: any) {
    const { typeUser } = this.user;
    this.periodSend = period
    this.isSelectPeriod = '';
    if (typeUser === 'affiliate') {
      this.getInfoAffiliate();
      this.getInfoRanking();
    }
    if (typeUser === 'admin') {
      this.getInfoAdmin();
    }
  }

  /**
   * Obtiene la información de los indicadores.
   *
   * @param selectors - Los selectores utilizados para obtener la información.
   * @param selectors.Segments - Los segmentos seleccionados.
   * @param selectors.Agencies - Las agencias seleccionadas.
   * @param selectors.Rols - Los roles seleccionados.
   */
  getInfoIndicators(selectors: any) {
    this.Segment = selectors.Segments;
    this.Agency = selectors.Agencies
    this.Role = selectors.Rols
    this.getInfoAdmin();
  }

  /**
   * Obtiene la información del administrador.
   *
   * @param Segment - El segmento.
   * @param Regional - La regional.
   * @param Agency - La agencia.
   * @param Role - El rol.
   * @returns Un objeto Observable con la información del administrador.
   */
  getInfoAdmin() {
    const { Segment, Regional, Agency, Role } = this;
    if (this.periodSend === 0) {
      this.isSelectPeriod = 'Debe seleccionar un periodo';
      return;
    }
    this.reportRepository.getInfoAdminFinally(this.periodSend, { Segments: Segment, Regionals: Regional, Agencies: Agency, Rols: Role }).subscribe({
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
      },
      error: (error) => {
        this.indicators = [{ Indicator: 'Indicador 1', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 2', Finishline: 0, Compliance: 0, Points: 0 }, { Indicator: 'Indicador 3', Finishline: 0, Compliance: 0, Points: 0 }];
      }
    })
  }

  /**
   * Obtiene la información de clasificación.
   *
   * @param periodSend - El período de envío.
   * @param countId - El ID del contador.
   * @returns Una suscripción al observable que emite la respuesta con los datos de clasificación.
   */
  getInfoRanking() {
    const { countId } = this.user;
    this.reportRepository.getInfoRanking(this.periodSend, countId).subscribe({
      next: (resp) => {
        const { TotalPoints, RankingLevels } = resp.data;
        this.ranking = {
          rankingPais: RankingLevels.length > 0 ? RankingLevels.find(item => item.LevelName === "País")?.Ranking : '--',
          rankingAgencia: RankingLevels.length > 0 ? RankingLevels.find(item => item.LevelName === "Agencia")?.Ranking : '--',
          rankingRegion: RankingLevels.length > 0 ? RankingLevels.find(item => item.LevelName === "Regional")?.Ranking : '--'
        }
        this.pointsTotal = TotalPoints;
      },
      error: (error) => {
        this.pointsTotal = 0;
      }
    })
  }

  /**
   * Obtiene la información de la cuenta del usuario.
   *
   * @returns {void}
   */
  getInfoAccount() {
    const { countId } = this.user;
    this.reportRepository.getInfoCountAffiliateFinally(countId).subscribe({
      next: (resp) => {
        this.information = {
          force: resp.data.dataUser.Segment,
          regional: resp.data.dataUser.Regional.length > 0 ? resp.data.dataUser.Regional[0] + '...' : resp.data.dataUser.Regional[0],
          cedi: resp.data.dataUser.Agency,
          occupation: '---'
        }
      },
      error: (error) => {
        this.information = { force: '--', regional: '--', cedi: '--', occupation: '--' }
      }
    })
  }

}
