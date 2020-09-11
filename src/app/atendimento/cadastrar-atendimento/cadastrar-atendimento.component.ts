import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-cadastrar-atendimento',
  templateUrl: './cadastrar-atendimento.component.html',
  styleUrls: ['./cadastrar-atendimento.component.css']
})
export class CadastrarAtendimentoComponent implements OnInit {

  // //atributos
  medicos = [];
  pacientes = [];
  mensagemCadastro: string;

  // //erros
  errosLocal: [];
  errosMedico: [];
  errosPaciente: [];
  errosDataNasc: [];

  // //para jogar em casa no campo do formulario de edicao
  AtendimentoEdicao = {
    idAtendimento: 0,
    dataAtendimento: '',
    local: '',
    idMedico: 0,
    idPaciente: 0,
    observacoes: '',

  };

  httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.createHttpHeaders();
  
    // //acessar a API para consultar medicos..
    this.httpClient.get("http://thiagoleta2-001-site3.htempurl.com//api/medico",{ headers: this.httpHeaders })
      .subscribe(
        (data: any[]) => {
          this.medicos = data;
          //  console.log(data);
        }
      );

    // //acessar a API para consultar pacientes..
    this.httpClient.get("http://thiagoleta2-001-site3.htempurl.com//api/paciente",  { headers: this.httpHeaders })
      .subscribe(
        (data: any[]) => {
          this.pacientes = data;
          //  console.log(data);
        }
      );

  }
  cadastrarAtendimento(formCadastro) {
    this.mensagemCadastro = "Processando, por favor aguarde...";
    // //executando uma requisição POST para a API..
    this.httpClient.post("http://thiagoleta2-001-site3.htempurl.com//api/atendimento", formCadastro.value,
      { responseType: 'text', headers: this.httpHeaders })
      .subscribe(
        data => {
          this.mensagemCadastro = data.toString();
          formCadastro.reset();
        },
        e => {
          const response = JSON.parse(e.error);

          console.log(response);
          this.errosMedico = response.idMedico;
          this.errosPaciente = response.idPaciente;
          this.errosDataNasc = response.dataAtendimento;

        }
      )
  }


  createHttpHeaders() {

    //verificar se há um TOKEN gravado em COOKIE  
    var token = this.cookieService.get('acess_token');
    console.log(token);
    if (token != null && token.length > 0) {
      //montando o HEADER com AUTHORIZATION   
      this.httpHeaders = new HttpHeaders()
        .set('Authorization', 'Bearer ' + token);
    }
    else {
       window.location.href = "/autenticar-usuario";
    }
  }
}

