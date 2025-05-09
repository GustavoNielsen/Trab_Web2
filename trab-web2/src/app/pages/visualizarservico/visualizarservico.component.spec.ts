import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarservicoComponent } from './visualizarservico.component';

describe('VisualizarservicoComponent', () => {
  let component: VisualizarservicoComponent;
  let fixture: ComponentFixture<VisualizarservicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarservicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarservicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
