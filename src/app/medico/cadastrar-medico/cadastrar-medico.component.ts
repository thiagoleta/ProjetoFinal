import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-cadastrar-medico',
  templateUrl: './cadastrar-medico.component.html',
  styleUrls: ['./cadastrar-medico.component.css']
})
export class CadastrarMedicoComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }
  // //atributos
  errosNome: [];
  crm: [];
  especializacao: [];
  mensagem: string;


  httpHeaders: HttpHeaders;

  ngOnInit(): void {

    this.createHttpHeaders();
  }

  cadastrarMedico(formmedico) {
    // //limpando as mensagens de erro
    errosNome: [];
    crm: [];
    especializacao: [];

    // //exibindo mensagem na página..
    this.mensagem = 'Processando requisição, por favor aguarde...';

    // //executando uma requisição POST para a API..
    this.httpClient.post("http://thiagoleta2-001-site3.htempurl.com//api/medico",
      formmedico.value,
      { responseType: 'text', headers: this.httpHeaders })
      .subscribe(
        data => {
          this.mensagem = data.toString();
          console.log(data);

          formmedico.reset();
        },
        e => { //resposta de erro!

          //capturando os erros retornados pela API em JSON
          const response = JSON.parse(e.error);
          console.log(response);

          this.crm = response.CRM;
          this.errosNome = response.Nome;
          this.especializacao = response.Especializacao;
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




