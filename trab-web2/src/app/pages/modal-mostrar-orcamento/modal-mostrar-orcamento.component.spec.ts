import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMostrarOrcamentoComponent } from './modal-mostrar-orcamento.component';

describe('ModalMostrarOrcamentoComponent', () => {
  let component: ModalMostrarOrcamentoComponent;
  let fixture: ComponentFixture<ModalMostrarOrcamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMostrarOrcamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMostrarOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
