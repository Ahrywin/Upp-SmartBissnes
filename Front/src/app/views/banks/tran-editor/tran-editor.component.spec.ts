// IMPLEMENTACION DEL MODULO CREAR USUARIO

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranEditorComponent } from './tran-editor.component';

describe('TranEditorComponent', () => {
  let component: TranEditorComponent;
  let fixture: ComponentFixture<TranEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
