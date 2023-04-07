import { TestBed } from '@angular/core/testing';

import { DynamicComponentsStoreService } from './dynamic-components-store.service';

describe('DynamicComponentsStoreService', () => {
  let service: DynamicComponentsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicComponentsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
