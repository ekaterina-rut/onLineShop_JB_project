import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationProceedComponent } from './registration-proceed.component';

describe('RegistrationProceedComponent', () => {
  let component: RegistrationProceedComponent;
  let fixture: ComponentFixture<RegistrationProceedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationProceedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationProceedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
