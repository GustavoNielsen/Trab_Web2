import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagaServicoComponent } from './paga-servico.component';

describe('PagaServicoComponent', () => {
  let component: PagaServicoComponent;
  let fixture: ComponentFixture<PagaServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagaServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagaServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
