import { TestBed } from '@angular/core/testing';

import { StockSService } from './stock-s.service';

describe('StockSService', () => {
  let service: StockSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
