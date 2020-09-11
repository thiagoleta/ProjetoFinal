import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPacienteComponent } from './consultar-paciente.component';

describe('ConsultarPacienteComponent', () => {
  let component: ConsultarPacienteComponent;
  let fixture: ComponentFixture<ConsultarPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
