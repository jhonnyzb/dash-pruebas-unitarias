import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatErrorsDialogComponent } from './mat-errors-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { of } from 'rxjs';
import { ReportsRepository } from 'src/app/core/repositories/reportsCash.respository';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { ErrorsReportsResponseModel } from 'src/app/core/models/ErrorsReportsResponse.model';

describe('MatErrorsDialogComponent', () => {
  let component: MatErrorsDialogComponent;
  let fixture: ComponentFixture<MatErrorsDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<MatErrorsDialogComponent>>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let reportsRepositorySpy: jasmine.SpyObj<ReportsRepository>;

  beforeEach(() => {
    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['openCloseSessionDialog']);
    reportsRepositorySpy = jasmine.createSpyObj('ReportsRepository', ['getErrorProcessesTypeCash']);
    TestBed.configureTestingModule({
      declarations: [MatErrorsDialogComponent],
      imports: [HttpClientModule, MatIconModule, MatTooltipModule, MatPaginatorModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: reportsRepositorySpy, useValue: reportsRepositorySpy },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatErrorsDialogComponent);
    component = fixture.componentInstance;
    component.pagination = {
      PageNumber: 1,
      PageSize: 10,
      TotalElements: 100,
      TotalPages: 10,
    };

    component.idationErrors = 123;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update pagination and call getTypeCashErrors if idationErrors is not null', () => {
    const event: PageEvent = { pageIndex: 1, pageSize: 20, length: 100 };
    
    spyOn(component, 'getTypeCashErrors').and.callThrough();

    component.onPageChange(event);

    expect(component.pagination.PageNumber).toBe(2);
    expect(component.pagination.PageSize).toBe(20);
    expect(component.getTypeCashErrors).toHaveBeenCalledWith(123, 2, 20);
  });

  it('should filter processes data based on pagination', () => {
    component.processesData = [
      {
        RedemptionProcessDetailId: 1,
        ErrorDetail: '',
        Index: 1,
        IdentificationNumber: 'id23',
        IsValid: true
      }
    ];

    component.pagination = {
      PageNumber: 2,
      PageSize: 2,
      TotalElements: 6,
      TotalPages: 3
    };

    component.updatePagination();

    const expectedFilteredData = component.processesData.slice(2, 4);

    expect(component.processesDataFiltered).toEqual(expectedFilteredData);
  });



});
