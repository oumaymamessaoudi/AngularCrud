import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailvComponent } from './user-detailv.component';

describe('UserDetailvComponent', () => {
  let component: UserDetailvComponent;
  let fixture: ComponentFixture<UserDetailvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailvComponent]
    });
    fixture = TestBed.createComponent(UserDetailvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
