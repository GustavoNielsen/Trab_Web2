import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicialClienteComponent } from './pagina-inicial-cliente.component';

describe('PaginaInicialClienteComponent', () => {
  let component: PaginaInicialClienteComponent;
  let fixture: ComponentFixture<PaginaInicialClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaInicialClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaInicialClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
