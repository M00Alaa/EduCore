import { ComponentFixture, TestBed } from '@angular/core/testing';

import SystemSwitcherComponent from './system-switcher.component';

describe('SystemSwitcherComponent', () => {
  let component: SystemSwitcherComponent;
  let fixture: ComponentFixture<SystemSwitcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemSwitcherComponent]
    });
    fixture = TestBed.createComponent(SystemSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
