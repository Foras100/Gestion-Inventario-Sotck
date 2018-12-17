import { TestBed } from '@angular/core/testing';

import { RubroServiceService } from './rubro-service.service';

describe('RubroServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RubroServiceService = TestBed.get(RubroServiceService);
    expect(service).toBeTruthy();
  });
});
