import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSecretDialogComponent } from './add-secret-dialog.component';

describe('AddSecretDialogComponent', () => {
  let component: AddSecretDialogComponent;
  let fixture: ComponentFixture<AddSecretDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSecretDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSecretDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
