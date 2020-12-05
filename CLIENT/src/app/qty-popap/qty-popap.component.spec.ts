import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QtyPopapComponent } from './qty-popap.component';

describe('QtyPopapComponent', () => {
  let component: QtyPopapComponent;
  let fixture: ComponentFixture<QtyPopapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QtyPopapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QtyPopapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
