import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroequipamentoComponent } from './cadastroequipamento.component';

describe('CadastroequipamentoComponent', () => {
  let component: CadastroequipamentoComponent;
  let fixture: ComponentFixture<CadastroequipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroequipamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroequipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
