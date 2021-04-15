import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardImportComponent } from './wizard-import.component';

describe('WizardImportComponent', () => {
  let component: WizardImportComponent;
  let fixture: ComponentFixture<WizardImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
