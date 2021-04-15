import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankViewerComponent } from './bank-viewer.component';

describe('BankViewerComponent', () => {
  let component: BankViewerComponent;
  let fixture: ComponentFixture<BankViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
