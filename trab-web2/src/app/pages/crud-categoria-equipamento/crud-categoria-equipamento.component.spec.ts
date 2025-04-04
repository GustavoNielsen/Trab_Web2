import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCategoriaEquipamentoComponent } from './crud-categoria-equipamento.component';

describe('CrudCategoriaEquipamentoComponent', () => {
  let component: CrudCategoriaEquipamentoComponent;
  let fixture: ComponentFixture<CrudCategoriaEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudCategoriaEquipamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudCategoriaEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
