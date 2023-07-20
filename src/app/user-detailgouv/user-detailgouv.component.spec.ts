import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailgouvComponent } from './user-detailgouv.component';

describe('UserDetailgouvComponent', () => {
  let component: UserDetailgouvComponent;
  let fixture: ComponentFixture<UserDetailgouvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailgouvComponent]
    });
    fixture = TestBed.createComponent(UserDetailgouvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
