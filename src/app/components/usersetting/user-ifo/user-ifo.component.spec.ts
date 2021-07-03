import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIfoComponent } from './user-ifo.component';

describe('UserIfoComponent', () => {
  let component: UserIfoComponent;
  let fixture: ComponentFixture<UserIfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserIfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
