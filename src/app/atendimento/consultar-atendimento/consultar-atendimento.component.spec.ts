import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAtendimentoComponent } from './consultar-atendimento.component';

describe('ConsultarAtendimentoComponent', () => {
  let component: ConsultarAtendimentoComponent;
  let fixture: ComponentFixture<ConsultarAtendimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarAtendimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
