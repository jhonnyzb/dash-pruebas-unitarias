import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderReportComponent } from './header-report.component';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('HeaderReportComponent', () => {
  let component: HeaderReportComponent;
  let fixture: ComponentFixture<HeaderReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderReportComponent]
    })
    .compileComponents();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(HeaderReportComponent);
    component = fixture.componentInstance;
    component.user = {
      img: ''
    }
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update dateReport when dateReport changes', () => {
    const mockDateReport = '2024-09-05T10:00:00';

    const changes: SimpleChanges = {
      dateReport: new SimpleChange(null, mockDateReport, true),
    };
    component.ngOnChanges(changes);
    expect(component.dateReport).toBe('2024-09-05');
  });

  it('should update cargo, regional, cedi, and force when information changes', () => {
    const mockInformation = {
      cargo: 'vendedor',
      regional: 'sur',
      cedi: 'cedi1',
      force: 'ventas',
    };

    const changes: SimpleChanges = {
      information: new SimpleChange(null, mockInformation, true),
    };
    component.ngOnChanges(changes);
    expect(component.cargo).toBe('vendedor');
    expect(component.regional).toBe('sur');
    expect(component.cedi).toBe('cedi1');
    expect(component.force).toBe('ventas');
  });
});
