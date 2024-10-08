import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorReportComponent } from './selector-report.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('SelectorReportComponent', () => {
  let component: SelectorReportComponent;
  let fixture: ComponentFixture<SelectorReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorReportComponent],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(SelectorReportComponent);
    component = fixture.componentInstance;
    component.user = {
      typeUser: 'affiliate'
    }

     // Mock values for FormControls
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit correct values on selection change', () => {
    component.segments.setValue(['Segmento 1'] as any);
    component.regionals.setValue(['Regional 1'] as any);
    component.agencies.setValue(['Agencia 1'] as any);
    component.rols.setValue(['Rol 1'] as any);
  
    spyOn(component.messageEvent, 'emit');
  
    component.onSelectionChangeSegments();
  
    const expectedSelectors = {
      Segments: ['Segmento 1'],
      Regionals: ['Regional 1'],
      Agencies: ['Agencia 1'],
      Rols: ['Rol 1']
    };
  
    expect(component.messageEvent.emit).toHaveBeenCalledWith(expectedSelectors);
  });
});
