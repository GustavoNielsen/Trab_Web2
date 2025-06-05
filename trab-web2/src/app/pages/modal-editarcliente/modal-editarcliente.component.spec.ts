import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarclienteComponent } from './modal-editarcliente.component';

describe('ModalEditarclienteComponent', () => {
  let component: ModalEditarclienteComponent;
  let fixture: ComponentFixture<ModalEditarclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarclienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
