import { TestBed, async, inject } from '@angular/core/testing';

import { AuthguardcourseGuard } from './authguardcourse.guard';

describe('AuthguardcourseGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthguardcourseGuard]
    });
  });

  it('should ...', inject([AuthguardcourseGuard], (guard: AuthguardcourseGuard) => {
    expect(guard).toBeTruthy();
  }));
});
