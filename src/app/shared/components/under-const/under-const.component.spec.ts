import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderConstComponent } from './under-const.component';

describe('UnderConstComponent', () => {
  let component: UnderConstComponent;
  let fixture: ComponentFixture<UnderConstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UnderConstComponent]
    });
    fixture = TestBed.createComponent(UnderConstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
