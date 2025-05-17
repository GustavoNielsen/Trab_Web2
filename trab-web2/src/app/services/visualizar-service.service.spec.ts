import { TestBed } from '@angular/core/testing';

import { VisualizarServiceService } from './visualizar-service.service';

describe('VisualizarServiceService', () => {
  let service: VisualizarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
