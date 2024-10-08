import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginateComponent } from './paginate.component';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('PaginateComponent', () => {
  let component: PaginateComponent;
  let fixture: ComponentFixture<PaginateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginateComponent ]
    })
    .compileComponents();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(PaginateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update pagination properties and call getPaginate when paginate input changes', () => {
    const paginate = {
      totalElements: 100,
      totalPages: 10,
      pageSize: 10,
      currentPage: 1,
      itemsCurrentForPage: 10
    };

    spyOn(component, 'getPaginate').and.callThrough();

    const changes: SimpleChanges = {
      paginate: new SimpleChange(null, paginate, true)
    };

    component.ngOnChanges(changes);
    expect(component.totalElements).toBe(paginate.totalElements);
    expect(component.totalPages).toBe(paginate.totalPages);
    expect(component.pageSize).toBe(paginate.pageSize);
    expect(component.currentPage).toBe(paginate.currentPage);
    expect(component.itemsCurrentForPage).toBe(paginate.itemsCurrentForPage);
    expect(component.getPaginate).toHaveBeenCalled();
  });

  it('should calculate range correctly for the first page', () => {
    component.currentPage = 1;
    component.itemsCurrentForPage = 10;
    component.pageSize = 10;
    component.totalElements = 100;
    
    component.getPaginate();

    expect(component.rangeInit).toBe(1);
    expect(component.rangeEnd).toBe(10);
  });

  it('should set currentPage to totalPages if conditions are met and emit the value', () => {
    component.totalPages = 5;
    component.currentPage = 3;
    spyOn(component.pageCurrent, 'emit');

    component.getLastPage();

    expect(component.currentPage).toBe(5);
    expect(component.pageCurrent.emit).toHaveBeenCalledWith(5);
  });

  it('should not change currentPage or emit value if totalPages is 0', () => {
    component.totalPages = 0;
    component.currentPage = 1;
    
    spyOn(component.pageCurrent, 'emit');

    component.getLastPage();

    expect(component.currentPage).toBe(1);
    expect(component.pageCurrent.emit).not.toHaveBeenCalled();
  });

  it('should set currentPage to 1 and emit the value if currentPage is not 1', () => {
    component.totalPages = 5;
    component.currentPage = 3;
    spyOn(component.pageCurrent, 'emit');
  
    component.getFirstPage();
    expect(component.currentPage).toBe(1);

    expect(component.pageCurrent.emit).toHaveBeenCalledWith(1);
  });

  it('should not change currentPage or emit value if currentPage is already 1', () => {
    component.totalPages = 5;
    component.currentPage = 1;
    
    spyOn(component.pageCurrent, 'emit');
    component.getFirstPage();
  
    expect(component.currentPage).toBe(1);
    expect(component.pageCurrent.emit).not.toHaveBeenCalled();
  });

  it('should increment currentPage by 1 and emit the value if currentPage is less than totalPages', () => {
    component.totalPages = 5;
    component.currentPage = 3;
  
    spyOn(component.pageCurrent, 'emit');

    component.getNextPage();
  
    expect(component.currentPage).toBe(4);
    expect(component.pageCurrent.emit).toHaveBeenCalledWith(4);
  });
  
  it('should not change currentPage or emit value if currentPage is equal to totalPages', () => {
    component.totalPages = 5;
    component.currentPage = 5;
    
    spyOn(component.pageCurrent, 'emit');
  
    component.getNextPage();
  
    expect(component.currentPage).toBe(5);
    expect(component.pageCurrent.emit).not.toHaveBeenCalled();
  });

  it('should decrement currentPage by 1 and emit the value if currentPage is greater than 1', () => {
    component.totalPages = 5;
    component.currentPage = 3;
  
    spyOn(component.pageCurrent, 'emit');
    component.getPreviousPage();
  
    expect(component.currentPage).toBe(2);
    expect(component.pageCurrent.emit).toHaveBeenCalledWith(2);
  });
  
  it('should not change currentPage or emit value if currentPage is 1', () => {
    component.totalPages = 5;
    component.currentPage = 1;
    
    spyOn(component.pageCurrent, 'emit');
  
    component.getPreviousPage();
    expect(component.currentPage).toBe(1);
    expect(component.pageCurrent.emit).not.toHaveBeenCalled();
  });
});
