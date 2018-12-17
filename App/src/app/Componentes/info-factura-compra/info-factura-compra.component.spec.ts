import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFacturaCompraComponent } from './info-factura-compra.component';

describe('InfoFacturaCompraComponent', () => {
  let component: InfoFacturaCompraComponent;
  let fixture: ComponentFixture<InfoFacturaCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFacturaCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFacturaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
