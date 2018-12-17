import { TestBed } from '@angular/core/testing';

import { FacturaServiceService } from './factura-service.service';

describe('FacturaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacturaServiceService = TestBed.get(FacturaServiceService);
    expect(service).toBeTruthy();
  });
});
