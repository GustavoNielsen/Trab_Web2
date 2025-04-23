import { TestBed } from '@angular/core/testing';

import { SoliciticaoService } from './soliciticao.service';

describe('SoliciticaoService', () => {
  let service: SoliciticaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoliciticaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
