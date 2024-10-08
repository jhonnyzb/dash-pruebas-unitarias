import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getMenuList, getSession } from '../../utils/storage';
import { Subscription, filter } from 'rxjs';
import { Functionality, Page } from 'src/app/core/models/loginResponse.model';
import { GTMSelectContent } from 'src/app/core/models/gtmSelectContent.model';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { LoginValeproResponseModel } from 'src/app/core/models/loginValeproResponse.model';

@Component({
  selector: 'app-dasboard-modules',
  templateUrl: './dasboard-modules.component.html',
  styleUrls: ['./dasboard-modules.component.scss']
})
export class DasboardModulesComponent implements OnInit {

  currentRoute: string = '';
  tabActive: number = 0;
  tabActiveAdmin: string = 'monitoring';
  isWebResponsive = true;
  menuList: Functionality[] = [];
  reportMenu: Page[] = [];
  user: LoginValeproResponseModel;

  private routerEventsSubscription!: Subscription;
  constructor(
    private router: Router,
    private gtmEventRepository: GtmDispatchEventsRepository

  ) {
    this.user = getSession<LoginValeproResponseModel>('accountValepro', 'wr')!;

  }


  ngOnInit(): void {
    const userDataAdmin = getSession<any>('userLoginData', 'admin');
    if (userDataAdmin) this.isWebResponsive = false;

    if (this.isWebResponsive) this.getTabWR();
    else {
      this.menuList = getMenuList<any>('menuList');
      this.reportMenu = this.menuList.find(item => item.name === 'Informes')?.pages || [];
      this.getTabAdmin();
    }

    //cambio de ruta actualiza el tab
    this.routerEventsSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.isWebResponsive) this.getTabWR();
      else this.getTabAdmin();
    });
  }

  /**
   * Obtiene la pestaña de administración.
   *
   * @returns El identificador de la página activa.
   */
  getTabAdmin() {
    const currentUrl = window.location.pathname;
    this.tabActive = this.reportMenu.find(item => item.path === currentUrl)?.pageId || 0;
  }

  /**
   * Obtiene la pestaña activa en función de la URL actual.
   *
   * @returns La pestaña activa ('monitoring' o 'finally').
   */
  getTabWR() {
    const currentUrl = window.location.pathname;
    if (currentUrl === '/main/dashboard/monitoring-report') {
      this.tabActiveAdmin = 'monitoring'
    } else if (currentUrl === '/main/dashboard/finally-report') {
      this.tabActiveAdmin = 'finally'
    }
  }

  /**
   * Método de ciclo de vida ngOnDestroy.
   * Se llama justo antes de que se destruya el componente.
   * Desuscribe la suscripción a los eventos del enrutador.
   */
  ngOnDestroy(): void {
    this.routerEventsSubscription?.unsubscribe();
  }

  /**
   * Envía un evento de GTM para el panel de control.
   *
   * @param text - El texto asociado al evento.
   */
  sendGtmDashboard(text: string) {
    let tagData: GTMSelectContent = {
      event: "Select_content",
      ParameterTarget: "Home",
      ParameterLocation: 'Cabecera',
      ParameterType: 'button',
      ParameterCategory: 'Home-Indicadores',
      IDAccount: this.user!.AccountId,
      IDProgram: this.user!.ProgramId,
      IDPerson: this.user!.PersonId,
      UserName: this.user!.UserName,
      ParameterText: text,
      ParameterItemID: "",
    };
    this.gtmEventRepository.sendEvent(tagData);
  }
}
