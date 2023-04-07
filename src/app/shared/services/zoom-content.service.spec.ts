import { TestBed } from '@angular/core/testing';

import { ZoomContentService } from './zoom-content.service';

describe('ZoomContentService', () => {
  let service: ZoomContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
