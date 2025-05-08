import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioreceitasComponent } from './relatorioreceitas.component';

describe('RelatorioreceitasComponent', () => {
  let component: RelatorioreceitasComponent;
  let fixture: ComponentFixture<RelatorioreceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioreceitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioreceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
