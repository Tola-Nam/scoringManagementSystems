import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionAdminPageComponent } from './permission-admin-page.component';

describe('PermissionAdminPageComponent', () => {
  let component: PermissionAdminPageComponent;
  let fixture: ComponentFixture<PermissionAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionAdminPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
