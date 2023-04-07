import { TestBed } from '@angular/core/testing';

import { PasteDynamicComponentService } from './paste-dynamic-component.service';

describe('PasteDynamicComponentService', () => {
  let service: PasteDynamicComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasteDynamicComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
