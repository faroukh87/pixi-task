import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixiFieldComponent } from './pixi-field.component';

describe('PixiFieldComponent', () => {
  let component: PixiFieldComponent;
  let fixture: ComponentFixture<PixiFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixiFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixiFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
