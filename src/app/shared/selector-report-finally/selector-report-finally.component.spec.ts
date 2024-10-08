import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorReportFinallyComponent } from './selector-report-finally.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

describe('SelectorReportFinallyComponent', () => {
  let component: SelectorReportFinallyComponent;
  let fixture: ComponentFixture<SelectorReportFinallyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorReportFinallyComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
    
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(SelectorReportFinallyComponent);
    component = fixture.componentInstance;
    component.user = {
      typeUser: 'affiliate'
    }
    fixture.detectChanges();

  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit messageEventRegional when flag is regional', () => {
    spyOn(component.messageEventRegional, 'emit');
    component.onSelectionChangeSegments('regional');
    expect(component.messageEventRegional.emit).toHaveBeenCalledWith(component.regionals.value);
  });

  it('should emit messageEventSelector when flag is not regional', () => {
    spyOn(component.messageEventSelector, 'emit');
    const expectedValue = {
      Segments: component.segments.value,
      Agencies: component.agencies.value,
      Rols: component.rols.value
    };
    component.onSelectionChangeSegments();
    expect(component.messageEventSelector.emit).toHaveBeenCalledWith(expectedValue);
  });
});
