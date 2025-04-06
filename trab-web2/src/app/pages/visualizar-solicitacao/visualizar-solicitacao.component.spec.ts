import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarSolicitacaoComponent } from './visualizar-solicitacao.component';

describe('VisualizarSolicitacaoComponent', () => {
  let component: VisualizarSolicitacaoComponent;
  let fixture: ComponentFixture<VisualizarSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarSolicitacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
