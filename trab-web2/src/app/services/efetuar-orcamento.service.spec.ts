import { TestBed } from '@angular/core/testing';

import { EfetuarOrcamentoService } from './efetuar-orcamento.service';

describe('EfetuarOrcamentoService', () => {
  let service: EfetuarOrcamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EfetuarOrcamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
