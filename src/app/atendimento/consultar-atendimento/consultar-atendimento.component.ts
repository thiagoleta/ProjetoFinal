import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-consultar-atendimento',
  templateUrl: './consultar-atendimento.component.html',
  styleUrls: ['./consultar-atendimento.component.css']
})
export class ConsultarAtendimentoComponent implements OnInit {
  listaAtendimento = [];
  mensagemExclusao: string;

  //
  pacientes = [];
  medicos =[];
  // //edicao
  mensagemEdicao: string;

  // //para jogar em casa no campo do formulario de edicao
  atedimentoEdicao = {
    idAtendimento: 0,
    dataAtendimento: '',
    local: '',
    idMedico: 0,
    idPaciente: 0,
    observacoes: '',
  };

  // //erros
  errosId: [];
  errosLocal: [];
  errosMedico: [];
  errosPaciente: [];
  errosDataNasc: [];

  
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient,
    private cookieService: CookieService ) { }

  ngOnInit(): void {
    this.createHttpHeaders();
    this.consultarAtendimento();
    // //acessar a API para consultar medicos..
    this.http.get("http://thiagoleta2-001-site3.htempurl.com//api/medico",{ headers: this.httpHeaders })
      .subscribe(
        (data: any[]) => {
          this.medicos = data;
          //  console.log(data);
        }
      );

    // //acessar a API para consultar pacientes..
    this.http.get("http://thiagoleta2-001-site3.htempurl.com//api/paciente",{ headers: this.httpHeaders })
      .subscribe(
        (data: any[]) => {
          this.pacientes = data;
          //  console.log(data);
        }
      );

  }


  consultarAtendimento() {
    this.http.get("http://thiagoleta2-001-site3.htempurl.com//api/atendimento",{ headers: this.httpHeaders })
      .subscribe(
        (data: any[]) => {
          this.listaAtendimento = data;
          console.log(data);
        }
      )
  }

  excluirAtendimento(idAtendimento) {
    // alert(idMedico);
    if (confirm('Deseja realmente excluir este Atendimento?')) {

      //realizando uma chamada DELETE para a API
      this.http.delete("http://thiagoleta2-001-site3.htempurl.com//api/atendimento/" + idAtendimento, { headers: this.httpHeaders })
        .subscribe(
          data => { //recebendo o retorno de sucesso 
            //da API (PROMISSE)
            this.mensagemExclusao = data.toString();
            this.createHttpHeaders();
            this.consultarAtendimento();

            //executando a função de consulta
          },
          e => { //recebendo o retorno de erro da API (PROMISSE)
            this.mensagemExclusao = e.toString();
          }
        );
    }
  }

  obterAtendimento(idAtendimento) {
    this.errosDataNasc = [];
    this.errosLocal = [];
    this.errosMedico = [];
    this.errosPaciente = [];
    this.mensagemEdicao = '';
    // console.log(idMedico);
    //acessando a API e buscar os dados do cliente atraves do id
    this.http.get("http://thiagoleta2-001-site3.htempurl.com//api/atendimento/" + idAtendimento, { headers: this.httpHeaders })
      .subscribe(
        (data: any) => {
          // alert(JSON.stringify(data));
          this.atedimentoEdicao = data;
        },
        e => {
          console.log(e);
        }
      );
  }

  editarAtendimento(formEdicao){
    // //limpando as mensagens de erro
    errosDataNasc: [];
    errosLocal: [];
    especializacao: [];
    errosMedico:[];
    errosPaciente:[];

    // //exibindo mensagem na página..
    this.mensagemEdicao = 'Processando requisição, por favor aguarde...';

    // //executando uma requisição POST para a API..
    this.http.put("http://thiagoleta2-001-site3.htempurl.com//api/atendimento",
    formEdicao.value,
    { headers: this.httpHeaders })
      .subscribe(
        data => {
          this.mensagemEdicao = data.toString();
          // console.log(data);
          this.consultarAtendimento();
          console.log(data);
        },
        e => {
          // //capturando os erros retornados pela API em JSON
          const response = JSON.parse(e.error);
          // console.log(response); 
            // //Pegando os erros de validação da APi
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
