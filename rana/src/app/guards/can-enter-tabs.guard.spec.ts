import { TestBed } from '@angular/core/testing';

import { CanEnterTabsGuard } from './can-enter-tabs.guard';

describe('CanEnterTabsGuard', () => {
  let guard: CanEnterTabsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanEnterTabsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
