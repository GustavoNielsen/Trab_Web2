import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgataServicoComponent } from './resgata-servico.component';

describe('ResgataServicoComponent', () => {
  let component: ResgataServicoComponent;
  let fixture: ComponentFixture<ResgataServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResgataServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResgataServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
