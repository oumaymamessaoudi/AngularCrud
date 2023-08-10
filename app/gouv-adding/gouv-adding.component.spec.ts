import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvAddingComponent } from './gouv-adding.component';

describe('GouvAddingComponent', () => {
  let component: GouvAddingComponent;
  let fixture: ComponentFixture<GouvAddingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GouvAddingComponent]
    });
    fixture = TestBed.createComponent(GouvAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
