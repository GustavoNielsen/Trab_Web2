import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisarservicoComponent } from './visualisarservico.component';

describe('VisualisarservicoComponent', () => {
  let component: VisualisarservicoComponent;
  let fixture: ComponentFixture<VisualisarservicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualisarservicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualisarservicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
