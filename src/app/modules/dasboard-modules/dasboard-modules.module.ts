import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DasboardRoutingModule } from './dasboard-modules-routing.module';
import { MonitoringReportComponent } from './monitoring-report/monitoring-report.component';
import { FinallyReportComponent } from './finally-report/finally-report.component';
import { HeaderReportComponent } from '../../shared/header-report/header-report.component';
import { SelectorReportComponent } from '../../shared/selector-report/selector-report.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndicatorReportComponent } from '../../shared/indicator-report/indicator-report.component';
import { IndicatorIndividualComponent } from '../../shared/indicator-individual/indicator-individual.component';
import { RankingComponent } from '../../shared/ranking/ranking.component';
import { ReportRepository } from '../../core/repositories/report.repository';
import { ReportService } from '../../infrastructure/services/report.service';
import { PipeMoneyPipe } from '../../pipes/pipe-money.pipe';
import { HeaderReportFinallyComponent } from '../../shared/header-report-finally/header-report-finally.component';
import { SelectorReportFinallyComponent } from '../../shared/selector-report-finally/selector-report-finally.component';
import { MatIconModule } from '@angular/material/icon';
import { OrderReportComponent } from './order-report/order-report.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ReportsRepository } from 'src/app/core/repositories/reportsCash.respository';
import { TypeOrdersService } from 'src/app/infrastructure/services/type-orders.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PaginateComponent } from 'src/app/shared/paginate/paginate.component';
import { GtmDispatchEventsService } from 'src/app/infrastructure/services/gtm-dispatch-events.service';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';


@NgModule({
  declarations: [
    MonitoringReportComponent,
    FinallyReportComponent,
    HeaderReportComponent,
    SelectorReportComponent,
    IndicatorReportComponent,
    IndicatorIndividualComponent,
    RankingComponent,
    PipeMoneyPipe,
    HeaderReportFinallyComponent,
    SelectorReportFinallyComponent,
    OrderReportComponent,
    PaginateComponent
  ],
  exports: [PaginateComponent],
  imports: [
    CommonModule,
    DasboardRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule,
    CdkAccordionModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    { provide: ReportRepository, useClass: ReportService },
    { provide: ReportsRepository, useClass: TypeOrdersService },
    {provide: GtmDispatchEventsRepository, useClass: GtmDispatchEventsService},

    ToastrService
  ]
})
export class DasboardModule { }
