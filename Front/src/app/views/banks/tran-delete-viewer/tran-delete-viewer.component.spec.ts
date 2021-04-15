import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranDeleteViewerComponent } from './tran-delete-viewer.component';

describe('TranDeleteViewerComponent', () => {
  let component: TranDeleteViewerComponent;
  let fixture: ComponentFixture<TranDeleteViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranDeleteViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranDeleteViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
