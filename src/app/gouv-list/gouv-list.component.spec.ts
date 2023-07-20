import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvListComponent } from './gouv-list.component';

describe('GouvListComponent', () => {
  let component: GouvListComponent;
  let fixture: ComponentFixture<GouvListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GouvListComponent]
    });
    fixture = TestBed.createComponent(GouvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
