import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.css']
})
export class CadastrarPacienteComponent implements OnInit {
  // //injeção de dependencia par ainicializar o httpcliente
  constructor(private httpCliente: HttpClient,
    private cookieService: CookieService) { }
  // //atributos
  errosNome: [];
  errosCpf: [];
  errosTelefone: [];
  errosEmail: [];
  errosDataNasc = [];
  mensagem: string;

  httpHeaders: HttpHeaders;

  ngOnInit(): void {
    this.createHttpHeaders();
  }
  // //função executada no submit do formulário
  casdastrarPaciente(formCadastro) {
    // //limpando as mensagens de erro
    // console.log(formCadastro.value.dataNasc);
    this.errosNome = [];
    this.errosCpf = [];
    this.errosTelefone = [];
    this.errosEmail = [];



    // //exibindo mensagem na página..
    this.mensagem = 'Processando requisição, por favor aguarde...';

    // //executando uma requisição POST para a API..
    this.httpCliente.post("http://thiagoleta2-001-site3.htempurl.com//api/paciente",
      formCadastro.value,
      { responseType: 'text', headers: this.httpHeaders  })
      .subscribe(
        data => {
          this.mensagem = data.toString();
          formCadastro.reset();
        },
        e => { const response = JSON.parse(e.error);

            // console.log(response);
            this.errosNome= response.Nome;
            this.errosCpf = response.CPF;
            this.errosTelefone = response.Telefone;
            this.errosEmail = response.Email;
            
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
