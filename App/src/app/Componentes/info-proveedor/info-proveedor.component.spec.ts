import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProveedorComponent } from './info-proveedor.component';

describe('InfoProveedorComponent', () => {
  let component: InfoProveedorComponent;
  let fixture: ComponentFixture<InfoProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
