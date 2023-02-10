import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretDialogComponent } from './secret-dialog.component';

describe('SecretDialogComponent', () => {
  let component: SecretDialogComponent;
  let fixture: ComponentFixture<SecretDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
