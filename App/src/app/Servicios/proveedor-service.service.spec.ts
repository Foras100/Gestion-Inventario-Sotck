import { TestBed } from '@angular/core/testing';

import { ProveedorServiceService } from './proveedor-service.service';

describe('ProveedorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProveedorServiceService = TestBed.get(ProveedorServiceService);
    expect(service).toBeTruthy();
  });
});
