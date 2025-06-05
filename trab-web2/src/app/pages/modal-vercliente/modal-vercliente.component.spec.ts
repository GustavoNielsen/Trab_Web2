import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerclienteComponent } from './modal-vercliente.component';

describe('ModalVerclienteComponent', () => {
  let component: ModalVerclienteComponent;
  let fixture: ComponentFixture<ModalVerclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVerclienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVerclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
