import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkUsersAsAdminsDialogComponent } from './mark-users-as-admins-dialog.component';

describe('MarkUsersAsAdminsDialogComponent', () => {
  let component: MarkUsersAsAdminsDialogComponent;
  let fixture: ComponentFixture<MarkUsersAsAdminsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkUsersAsAdminsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkUsersAsAdminsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
