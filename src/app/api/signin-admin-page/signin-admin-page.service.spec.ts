import { TestBed } from '@angular/core/testing';

import { SigninAdminPageService } from './signin-admin-page.service';

describe('SigninAdminPageService', () => {
  let service: SigninAdminPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninAdminPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
