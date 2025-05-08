
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFuncionarioComponent } from './navbarfuncionario.component';

describe('NavbarfuncionarioComponent', () => {
  let component: NavbarFuncionarioComponent;
  let fixture: ComponentFixture<NavbarFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
