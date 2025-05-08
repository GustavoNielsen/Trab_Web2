import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarfuncionarioComponent } from './navbarfuncionario.component';

describe('NavbarfuncionarioComponent', () => {
  let component: NavbarfuncionarioComponent;
  let fixture: ComponentFixture<NavbarfuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarfuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarfuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
