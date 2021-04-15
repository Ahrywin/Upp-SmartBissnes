import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranViewerComponent } from './tran-viewer.component';

describe('TranViewerComponent', () => {
  let component: TranViewerComponent;
  let fixture: ComponentFixture<TranViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
