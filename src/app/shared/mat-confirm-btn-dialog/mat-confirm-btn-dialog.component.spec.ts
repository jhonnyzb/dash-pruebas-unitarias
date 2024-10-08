import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmBtnDialogComponent } from './mat-confirm-btn-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

describe('MatConfirmBtnDialogComponent', () => {
  let component: MatConfirmBtnDialogComponent;
  let fixture: ComponentFixture<MatConfirmBtnDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<MatConfirmBtnDialogComponent>>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(() => {
    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['openCloseSessionDialog']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    routerSpy.navigateByUrl.and.returnValue(Promise.resolve(true));
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    TestBed.configureTestingModule({
      declarations: [MatConfirmBtnDialogComponent],
      imports: [MatIconModule],
      providers:[
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefSpy},
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
   
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(MatConfirmBtnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog and navigate if redirect is set', async () => {
    component.redirect = '/new-url';
    await component.closeDialog();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/', { skipLocationChange: true });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/new-url']);
  });
});
