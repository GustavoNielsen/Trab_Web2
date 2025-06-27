import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirEditarUsuarioComponent } from './inserir-editar-usuario.component';

describe('InserirEditarUsuarioComponent', () => {
  let component: InserirEditarUsuarioComponent;
  let fixture: ComponentFixture<InserirEditarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserirEditarUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InserirEditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
