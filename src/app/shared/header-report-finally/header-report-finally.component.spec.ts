import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderReportFinallyComponent } from './header-report-finally.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('HeaderReportFinallyComponent', () => {
  let component: HeaderReportFinallyComponent;
  let fixture: ComponentFixture<HeaderReportFinallyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderReportFinallyComponent],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule]
    });
    fixture = TestBed.createComponent(HeaderReportFinallyComponent);
    component = fixture.componentInstance;
    component.user = {
      img: ''
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update occupation, regional, cedi, and force when information changes', () => {
    const mockInformation = {
      occupation: 'vendedor',
      regional: 'sur',
      cedi: 'cedi1',
      force: 'ventas',
    };

    const changes: SimpleChanges = {
      information: new SimpleChange(null, mockInformation, true),
    };
    component.ngOnChanges(changes);
    expect(component.occupation).toBe('vendedor');
    expect(component.regional).toBe('sur');
    expect(component.cedi).toBe('cedi1');
    expect(component.force).toBe('ventas');
  });

});
