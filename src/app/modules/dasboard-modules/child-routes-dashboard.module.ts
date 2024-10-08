import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitoringReportComponent } from './monitoring-report/monitoring-report.component';
import { FinallyReportComponent } from './finally-report/finally-report.component';
import { OrderReportComponent } from './order-report/order-report.component';

const childRoutes: Routes = [
  {
    path: 'monitoring-report',
    component: MonitoringReportComponent,
  },
  {
    path: 'finally-report',
    component: FinallyReportComponent,
  },
  {
    path: 'order-report',
    component: OrderReportComponent,
  },
  { path: '', redirectTo: '/main/dashboard/monitoring-report', pathMatch: 'full' }
]



@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesDashboardModule { }
