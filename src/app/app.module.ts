import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DasboardModulesComponent } from './modules/dasboard-modules/dasboard-modules.component';
import { DasboardModule } from './modules/dasboard-modules/dasboard-modules.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatErrorsDialogComponent } from './shared/mat-errors-dialog/mat-errors-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatConfirmBtnDialogComponent } from './shared/mat-confirm-btn-dialog/mat-confirm-btn-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    DasboardModulesComponent,
    MatErrorsDialogComponent,
    MatConfirmBtnDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    DasboardModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
