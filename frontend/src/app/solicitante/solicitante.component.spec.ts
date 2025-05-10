import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitanteComponent } from './solicitante.component';

describe('SolicitanteComponent', () => {
  let component: SolicitanteComponent;
  let fixture: ComponentFixture<SolicitanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitanteComponent]
    });
    fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
