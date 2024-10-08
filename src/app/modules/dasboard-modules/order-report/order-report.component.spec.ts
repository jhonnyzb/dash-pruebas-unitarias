import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReportComponent } from './order-report.component';
import { ReportsRepository } from 'src/app/core/repositories/reportsCash.respository';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';
import { TOAST_CONFIG, ToastrModule, ToastrService } from 'ngx-toastr';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { DownloadFormatResponseModel } from 'src/app/core/models/downloadFormat.model';
import { LoginResponseModel } from 'src/app/core/models/loginResponse.model';
import * as CryptoJS from 'crypto-js';
import { ReportsResponseModel } from 'src/app/core/models/reportsResponse.model';

export const saveSession = (key: string, data: any, flag: string = 'admin') => {
  const ENCRIPTKEY = flag === 'admin' ? "V4l3pr04dm1n" : "V4l3pr0US3r";
  const valueEncrypt = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRIPTKEY + key).toString();
  sessionStorage.setItem(key, valueEncrypt);
};

describe('OrderReportComponent', () => {
  let component: OrderReportComponent;
  let fixture: ComponentFixture<OrderReportComponent>;
  let reporstRepositorySpy: jasmine.SpyObj<ReportsRepository>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let gtmDispatchEventsRepositorySpy: jasmine.SpyObj<GtmDispatchEventsRepository>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    reporstRepositorySpy = jasmine.createSpyObj('ReportRepository', ['downloadFormat', 'getTypeCash']);
    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['openConfimDialog']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    gtmDispatchEventsRepositorySpy = jasmine.createSpyObj('GtmDispatchEventsRepository', ['sendEvent']);

    TestBed.configureTestingModule({
      declarations: [OrderReportComponent],
      imports: [
        ToastrModule.forRoot(),
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ReportsRepository, useValue: reporstRepositorySpy },
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: TOAST_CONFIG, useValue: {} },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: GtmDispatchEventsRepository, useValue: gtmDispatchEventsRepositorySpy },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    sessionStorage.clear;
    fixture = TestBed.createComponent(OrderReportComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  })

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a new window with the download URL when downloadFormat is successful', () => {
    const mockResponse: ResponseBase<DownloadFormatResponseModel> = {
      codeId: 200,
      message: 'success',
      data: {
        ParametersList: [{
          ParameterId: 1,
          ProgramId: 1,
          ConceptId: 1,
          ParameterName: '',
          ParameterValue: 'https://example.com/file.pdf',
        }]
      }
    };
    const spyOpen = spyOn(window, 'open');

    reporstRepositorySpy.downloadFormat.and.returnValue(of(mockResponse));
    const mockLoginUser: LoginResponseModel = {
      userId: '12345',
      userName: 'John diaz',
      accessToken: 'abc123token',
      email: 'johndiaz@example.com',
      personId: 98765,
      sessionId: 123456789,
      roles: {
        admin: true,
        user: false
      },
      programId: 1,
      programName: 'Example Program',
      languageId: 1,
      requiredNewPassword: false,
      phone: 1234567890,
      hiddenPhone: '*******',
      hiddenEmail: 'johndias@*****.com'
    };

    saveSession('userLoginData', mockLoginUser);

    component.downloadTemplate(123);

    expect(spyOpen).toHaveBeenCalledWith('https://example.com/file.pdf', '_blank');
  });

  it('should get and filter the data correctly when the call is successful', () => {
    const mockResponse: ResponseBase<ReportsResponseModel> = {
      codeId: 200,
      message: 'success',
      data: {
        Processes: {
          Data: [{
            RedemptionProcessId: 1,
            DateRegister: '',
            ProcessType: '',
            Status: '',
            StatusId: 1,
          },],
          Pagination: { PageSize: 10, PageNumber: 1, TotalElements: 10, TotalPages: 1 }
        }
      }
    };

    const pageNumber = 1;
    const pageSize = 2;

    reporstRepositorySpy.getTypeCash.and.returnValue(of(mockResponse));

    component.getTypeCase(1, pageNumber, pageSize);

    expect(component.processesData).toEqual(mockResponse.data.Processes.Data);
    expect(component.pagination).toEqual(mockResponse.data.Processes.Pagination);
    expect(component.processesDataFiltered).toEqual([{
      RedemptionProcessId: 1,
      DateRegister: '',
      ProcessType: '',
      Status: '',
      StatusId: 1,
    },]);
    expect(dialogServiceSpy.openConfimDialog).not.toHaveBeenCalled();
  });

  it('debería actualizar paginación y llamar a getTypeCase cuando selectedValue no es null', () => {
    component.selectedValue = 1;

    const pageEvent: PageEvent = {
      pageIndex: 1,  
      pageSize: 10,  
      length: 100
    };
    spyOn(component, 'getTypeCase');
    component.onPageChange(pageEvent);

    expect(component.pagination.PageNumber).toBe(2);  
    expect(component.pagination.PageSize).toBe(10);
    expect(component.getTypeCase).toHaveBeenCalledWith(1, 2, 10);
  });

});
