import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductToEditComponent } from './product-to-edit.component';

describe('ProductToEditComponent', () => {
  let component: ProductToEditComponent;
  let fixture: ComponentFixture<ProductToEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductToEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductToEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
