import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalistaComponent } from './analista.component';

describe('AnalistaComponent', () => {
  let component: AnalistaComponent;
  let fixture: ComponentFixture<AnalistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalistaComponent]
    });
    fixture = TestBed.createComponent(AnalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
