import { TestBed } from '@angular/core/testing';

import { ClienteServiceService } from './cliente-service.service';

describe('ClienteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteServiceService = TestBed.get(ClienteServiceService);
    expect(service).toBeTruthy();
  });
});
