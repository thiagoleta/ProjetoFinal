import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAtendimentoComponent } from './cadastrar-atendimento.component';

describe('CadastrarAtendimentoComponent', () => {
  let component: CadastrarAtendimentoComponent;
  let fixture: ComponentFixture<CadastrarAtendimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarAtendimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
