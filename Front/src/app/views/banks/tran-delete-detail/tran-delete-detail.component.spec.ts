import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranDeleteDetailComponent } from './tran-delete-detail.component';

describe('TranDeleteDetailComponent', () => {
  let component: TranDeleteDetailComponent;
  let fixture: ComponentFixture<TranDeleteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranDeleteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranDeleteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
