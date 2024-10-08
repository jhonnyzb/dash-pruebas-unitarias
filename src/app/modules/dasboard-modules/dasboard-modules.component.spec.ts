import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardModulesComponent } from './dasboard-modules.component';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { ActivatedRoute, RouterModule } from '@angular/router';
import * as CryptoJS from 'crypto-js';

export const saveSession = (key: string, data: any) => {
  const valueEncrypt = CryptoJS.AES.encrypt(JSON.stringify(data), 'V4l3pr04dm1n' + key).toString();
  sessionStorage.setItem(key, valueEncrypt);
};

describe('DasboardModulesComponent', () => {
  let component: DasboardModulesComponent;
  let fixture: ComponentFixture<DasboardModulesComponent>;
  let gtmDispatchEventsRepositorySpy: jasmine.SpyObj<GtmDispatchEventsRepository>;

  beforeEach(() => {
    gtmDispatchEventsRepositorySpy = jasmine.createSpyObj('GtmDispatchEventsRepository', ['sendEvent']);
    TestBed.configureTestingModule({
      declarations: [DasboardModulesComponent],
      imports:[RouterModule],
      providers: [
        { provide: GtmDispatchEventsRepository, useValue: gtmDispatchEventsRepositorySpy },
        {
          provide: ActivatedRoute, 
          useValue : {}
        }
      ]
    })
    sessionStorage.clear();
    fixture = TestBed.createComponent(DasboardModulesComponent);
    component = fixture.componentInstance;
    const menulist = {
      name: 'Informes'
    }
    saveSession('menuList', menulist);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
