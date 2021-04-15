import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankResumeComponent } from './bank-resume.component';

describe('BankResumeComponent', () => {
  let component: BankResumeComponent;
  let fixture: ComponentFixture<BankResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
