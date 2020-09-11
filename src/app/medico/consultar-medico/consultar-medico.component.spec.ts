import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMedicoComponent } from './consultar-medico.component';

describe('ConsultarMedicoComponent', () => {
  let component: ConsultarMedicoComponent;
  let fixture: ComponentFixture<ConsultarMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
