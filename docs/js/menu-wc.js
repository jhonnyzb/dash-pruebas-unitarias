'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">valepro-dashboards documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-342d560239dfc8fd6af71e7248694b378b8d7acf154a4d89a981d21be278d0330294a917b996750e3158f17dc383ef67ec2de168ff6768c409140e5a4f4a8fb8"' : 'data-bs-target="#xs-components-links-module-AppModule-342d560239dfc8fd6af71e7248694b378b8d7acf154a4d89a981d21be278d0330294a917b996750e3158f17dc383ef67ec2de168ff6768c409140e5a4f4a8fb8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-342d560239dfc8fd6af71e7248694b378b8d7acf154a4d89a981d21be278d0330294a917b996750e3158f17dc383ef67ec2de168ff6768c409140e5a4f4a8fb8"' :
                                            'id="xs-components-links-module-AppModule-342d560239dfc8fd6af71e7248694b378b8d7acf154a4d89a981d21be278d0330294a917b996750e3158f17dc383ef67ec2de168ff6768c409140e5a4f4a8fb8"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DasboardModulesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DasboardModulesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatConfirmBtnDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MatConfirmBtnDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatErrorsDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MatErrorsDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ChildRoutesDashboardModule.html" data-type="entity-link" >ChildRoutesDashboardModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DasboardModule.html" data-type="entity-link" >DasboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DasboardModule-79e0a1013490588396d6a31f9144f1ae2dc220ff7e91aa8837e76011ad1fcffdc66788f6ad41048d969d84c1c96e93091e07ba9c4e5f8f1359d2983e6790f896"' : 'data-bs-target="#xs-components-links-module-DasboardModule-79e0a1013490588396d6a31f9144f1ae2dc220ff7e91aa8837e76011ad1fcffdc66788f6ad41048d969d84c1c96e93091e07ba9c4e5f8f1359d2983e6790f896"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DasboardModule-79e0a1013490588396d6a31f9144f1ae2dc220ff7e91aa8837e76011ad1fcffdc66788f6ad41048d969d84c1c96e93091e07ba9c4e5f8f1359d2983e6790f896"' :
                                            'id="xs-components-links-module-DasboardModule-79e0a1013490588396d6a31f9144f1ae2dc220ff7e91aa8837e76011ad1fcffdc66788f6ad41048d969d84c1c96e93091e07ba9c4e5f8f1359d2983e6790f896"' }>
                                            <li class="link">
                                                <a href="components/FinallyReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FinallyReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderReportFinallyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderReportFinallyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IndicatorIndividualComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorIndividualComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IndicatorReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MonitoringReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MonitoringReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaginateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RankingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RankingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectorReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectorReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectorReportFinallyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectorReportFinallyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-DasboardModule-79e0a1013490588396d6a31f9144f1ae2dc220ff7e91aa8837e76011ad1fcffdc66788f6ad41048d969d84c1c96e93091e07ba9c4e5f8f1359d2983e6790f896"' : 'data-bs-target="#xs-pipes-links-module-DasboardModule-79e0a1013490588396d6a31f9144f1ae2dc220ff7e91aa8837e76011ad1fcffdc66788f6ad41048d969d84c1c96e93091e07ba9c4e5f8f1359d2983e6790f896"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-DasboardModule-79e0a1013490588396d6a31f9144f1ae2dc220ff7e91aa8837e76011ad1fcffdc66788f6ad41048d969d84c1c96e93091e07ba9c4e5f8f1359d2983e6790f896"' :
                                            'id="xs-pipes-links-module-DasboardModule-79e0a1013490588396d6a31f9144f1ae2dc220ff7e91aa8837e76011ad1fcffdc66788f6ad41048d969d84c1c96e93091e07ba9c4e5f8f1359d2983e6790f896"' }>
                                            <li class="link">
                                                <a href="pipes/PipeMoneyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PipeMoneyPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DasboardRoutingModule.html" data-type="entity-link" >DasboardRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AccountMapper.html" data-type="entity-link" >AccountMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/AffiliateMapper.html" data-type="entity-link" >AffiliateMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/AffiliateModel.html" data-type="entity-link" >AffiliateModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/AffiliateRanking.html" data-type="entity-link" >AffiliateRanking</a>
                            </li>
                            <li class="link">
                                <a href="classes/AgenciesMapper.html" data-type="entity-link" >AgenciesMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/AgenciesModel.html" data-type="entity-link" >AgenciesModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ComplianceMapper.html" data-type="entity-link" >ComplianceMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/CompliancesAffiliateModel.html" data-type="entity-link" >CompliancesAffiliateModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CompliancesInfoModel.html" data-type="entity-link" >CompliancesInfoModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CompliancesModel.html" data-type="entity-link" >CompliancesModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DaumErrorsModel.html" data-type="entity-link" >DaumErrorsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DaumModel.html" data-type="entity-link" >DaumModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DetailTypeModelRequestModel.html" data-type="entity-link" >DetailTypeModelRequestModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DownloadFormatResponseModel.html" data-type="entity-link" >DownloadFormatResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorResponseModel.html" data-type="entity-link" >ErrorResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorsModel.html" data-type="entity-link" >ErrorsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorsReportsResponseModel.html" data-type="entity-link" >ErrorsReportsResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileRequestModel.html" data-type="entity-link" >FileRequestModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Functionality.html" data-type="entity-link" >Functionality</a>
                            </li>
                            <li class="link">
                                <a href="classes/GtmDispatchEventsRepository.html" data-type="entity-link" >GtmDispatchEventsRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/GTMSelectContent.html" data-type="entity-link" >GTMSelectContent</a>
                            </li>
                            <li class="link">
                                <a href="classes/IndicatorMapper.html" data-type="entity-link" >IndicatorMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/IndicatorModel.html" data-type="entity-link" >IndicatorModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/IndicatorResponseModel.html" data-type="entity-link" >IndicatorResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/InfoCountAfiliateFinallyModel.html" data-type="entity-link" >InfoCountAfiliateFinallyModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/InfoCountModel.html" data-type="entity-link" >InfoCountModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponseModel.html" data-type="entity-link" >LoginResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginValeproResponseModel.html" data-type="entity-link" >LoginValeproResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Page.html" data-type="entity-link" >Page</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationErrorsRuleModel.html" data-type="entity-link" >PaginationErrorsRuleModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationRuleModel.html" data-type="entity-link" >PaginationRuleModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParameterModel.html" data-type="entity-link" >ParameterModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PeriodMapper.html" data-type="entity-link" >PeriodMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/PeriodsModel.html" data-type="entity-link" >PeriodsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProcessesModel.html" data-type="entity-link" >ProcessesModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/RankingMapper.html" data-type="entity-link" >RankingMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegionalMapper.html" data-type="entity-link" >RegionalMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegionalModel.html" data-type="entity-link" >RegionalModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportRepository.html" data-type="entity-link" >ReportRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportsMapper.html" data-type="entity-link" >ReportsMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportsRepository.html" data-type="entity-link" >ReportsRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportsResponseModel.html" data-type="entity-link" >ReportsResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestIndicatorsAdmin.html" data-type="entity-link" >RequestIndicatorsAdmin</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseBase.html" data-type="entity-link" >ResponseBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleModel.html" data-type="entity-link" >RoleModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SegmentMapper.html" data-type="entity-link" >SegmentMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/SegmentsModel.html" data-type="entity-link" >SegmentsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectorMapper.html" data-type="entity-link" >SelectorMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectorResponseModel.html" data-type="entity-link" >SelectorResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectorResponseModel1.html" data-type="entity-link" >SelectorResponseModel1</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectorResponseModelF.html" data-type="entity-link" >SelectorResponseModelF</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectorResponseModelFinally.html" data-type="entity-link" >SelectorResponseModelFinally</a>
                            </li>
                            <li class="link">
                                <a href="classes/TypeModelRequestModel.html" data-type="entity-link" >TypeModelRequestModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadFileResponseModel.html" data-type="entity-link" >UploadFileResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadtypeOfCashRequestModel.html" data-type="entity-link" >UploadtypeOfCashRequestModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserModel.html" data-type="entity-link" >UserModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRanking.html" data-type="entity-link" >UserRanking</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DialogService.html" data-type="entity-link" >DialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GtmDispatchEventsService.html" data-type="entity-link" >GtmDispatchEventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportService.html" data-type="entity-link" >ReportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TypeOrdersService.html" data-type="entity-link" >TypeOrdersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AffiliateDTO.html" data-type="entity-link" >AffiliateDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/affiliateRankingDTO.html" data-type="entity-link" >affiliateRankingDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/agenciesResponseDTO.html" data-type="entity-link" >agenciesResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompliancesAffiliateDTO.html" data-type="entity-link" >CompliancesAffiliateDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/compliancesInfoDTO.html" data-type="entity-link" >compliancesInfoDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/compliancesResponseDTO.html" data-type="entity-link" >compliancesResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DaumDto.html" data-type="entity-link" >DaumDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DaumErrorsDto.html" data-type="entity-link" >DaumErrorsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogParams.html" data-type="entity-link" >DialogParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DownloadFormatResponseDto.html" data-type="entity-link" >DownloadFormatResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorsDto.html" data-type="entity-link" >ErrorsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorsReportsResponseDto.html" data-type="entity-link" >ErrorsReportsResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileRequestDto.html" data-type="entity-link" >FileRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IndicatorDTO.html" data-type="entity-link" >IndicatorDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IndicatorMedium.html" data-type="entity-link" >IndicatorMedium</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IndicatorResponseDTO.html" data-type="entity-link" >IndicatorResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/infoCountDetailResponseDTO.html" data-type="entity-link" >infoCountDetailResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/infoCountResponseDTO.html" data-type="entity-link" >infoCountResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginationErrorsRuleDto.html" data-type="entity-link" >PaginationErrorsRuleDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginationRuleDto.html" data-type="entity-link" >PaginationRuleDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParameterDto.html" data-type="entity-link" >ParameterDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/periodResponseDTO.html" data-type="entity-link" >periodResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProcessesDto.html" data-type="entity-link" >ProcessesDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/rankingInfoDTO.html" data-type="entity-link" >rankingInfoDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/regionalResponseDTO.html" data-type="entity-link" >regionalResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReportsResponseDto.html" data-type="entity-link" >ReportsResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/segmentResponseDTO.html" data-type="entity-link" >segmentResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectorResponseDTO.html" data-type="entity-link" >SelectorResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectorResponseDTO1.html" data-type="entity-link" >SelectorResponseDTO1</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectorResponseFDTO.html" data-type="entity-link" >SelectorResponseFDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectorResponseFDTO1.html" data-type="entity-link" >SelectorResponseFDTO1</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TypeModelRequestDto.html" data-type="entity-link" >TypeModelRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadFileResponseDto.html" data-type="entity-link" >UploadFileResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadtypeOfCashRequestDto.html" data-type="entity-link" >UploadtypeOfCashRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/userDTO.html" data-type="entity-link" >userDTO</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});