import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeVillesComponent } from './gestion-de-villes.component';

describe('GestionDeVillesComponent', () => {
  let component: GestionDeVillesComponent;
  let fixture: ComponentFixture<GestionDeVillesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionDeVillesComponent]
    });
    fixture = TestBed.createComponent(GestionDeVillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
