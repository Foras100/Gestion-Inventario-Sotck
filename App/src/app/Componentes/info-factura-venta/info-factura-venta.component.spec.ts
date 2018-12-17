import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFacturaVentaComponent } from './info-factura-venta.component';

describe('InfoFacturaVentaComponent', () => {
  let component: InfoFacturaVentaComponent;
  let fixture: ComponentFixture<InfoFacturaVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFacturaVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFacturaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
