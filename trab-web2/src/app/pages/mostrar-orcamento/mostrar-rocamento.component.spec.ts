import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRocamentoComponent } from './mostrar-rocamento.component';

describe('MostrarRocamentoComponent', () => {
  let component: MostrarRocamentoComponent;
  let fixture: ComponentFixture<MostrarRocamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarRocamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarRocamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
