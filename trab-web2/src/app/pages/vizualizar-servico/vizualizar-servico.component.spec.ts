import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarServicoComponent } from './vizualizar-servico.component';

describe('VizualizarServicoComponent', () => {
  let component: VizualizarServicoComponent;
  let fixture: ComponentFixture<VizualizarServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VizualizarServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VizualizarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
