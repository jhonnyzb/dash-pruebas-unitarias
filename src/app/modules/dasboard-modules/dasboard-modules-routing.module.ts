import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DasboardModulesComponent } from './dasboard-modules.component';

const routes: Routes = [
  {
    path: '',
    component: DasboardModulesComponent,
    loadChildren: () => import('./child-routes-dashboard.module').then((m) => m.ChildRoutesDashboardModule )
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasboardRoutingModule { }
