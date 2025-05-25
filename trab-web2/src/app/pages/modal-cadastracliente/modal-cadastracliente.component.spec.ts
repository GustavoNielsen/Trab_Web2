import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastraclienteComponent } from './modal-cadastracliente.component';

describe('ModalCadastraclienteComponent', () => {
  let component: ModalCadastraclienteComponent;
  let fixture: ComponentFixture<ModalCadastraclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCadastraclienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastraclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
