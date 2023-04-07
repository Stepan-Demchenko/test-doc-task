import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponentWrapperComponent } from './dynamic-component-wrapper.component';

describe('DynamicComponentWrapperComponent', () => {
  let component: DynamicComponentWrapperComponent;
  let fixture: ComponentFixture<DynamicComponentWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DynamicComponentWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicComponentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
