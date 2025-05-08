import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarservicoComponent } from './pagarservico.component';

describe('PagarservicoComponent', () => {
  let component: PagarservicoComponent;
  let fixture: ComponentFixture<PagarservicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagarservicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagarservicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
