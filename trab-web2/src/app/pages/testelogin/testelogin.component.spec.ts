import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteloginComponent } from './testelogin.component';

describe('TesteloginComponent', () => {
  let component: TesteloginComponent;
  let fixture: ComponentFixture<TesteloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesteloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
