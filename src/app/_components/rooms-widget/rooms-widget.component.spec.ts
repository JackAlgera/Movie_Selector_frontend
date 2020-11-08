import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsWidgetComponent } from './rooms-widget.component';

describe('RoomsWidgetComponent', () => {
  let component: RoomsWidgetComponent;
  let fixture: ComponentFixture<RoomsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
