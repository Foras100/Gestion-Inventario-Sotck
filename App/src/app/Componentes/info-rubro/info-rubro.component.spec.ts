import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRubroComponent } from './info-rubro.component';

describe('InfoRubroComponent', () => {
  let component: InfoRubroComponent;
  let fixture: ComponentFixture<InfoRubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
