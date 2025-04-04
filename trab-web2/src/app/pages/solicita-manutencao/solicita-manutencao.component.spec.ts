import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitaManutencaoComponent } from './solicita-manutencao.component';

describe('SolicitaManutencaoComponent', () => {
  let component: SolicitaManutencaoComponent;
  let fixture: ComponentFixture<SolicitaManutencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitaManutencaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitaManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
