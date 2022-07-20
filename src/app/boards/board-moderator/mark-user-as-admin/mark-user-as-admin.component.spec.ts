import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkUserAsAdminComponent } from './mark-user-as-admin.component';

describe('MarkUserAsAdminComponent', () => {
  let component: MarkUserAsAdminComponent;
  let fixture: ComponentFixture<MarkUserAsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkUserAsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkUserAsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
