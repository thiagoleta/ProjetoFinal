import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-loginUsuario',
  templateUrl: './loginUsuario.component.html',
  styleUrls: ['./loginUsuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  //atributos
  mensagem: string;

  errosNome: []; //array vazio
  errosEmail: []; //array vazio
  errosSenha: []; //array vazio
  errosSenhaConfirmacao: []; //array vazio

  //injeção de dependência para inicialiar o HttpClient
  constructor(private httpClient: HttpClient,
    private cookieService : CookieService) { }

  ngOnInit(): void {
  }

  //função executada no submit do formulário
  autenticarUsuario(formLogin) {

    //limpando as mensagens de erro
    this.errosNome = [];
    this.errosEmail = [];
    this.errosSenha = [];
    this.errosSenhaConfirmacao = [];

    //exibindo mensagem na página..
    this.mensagem = "Processando requisição, por favor aguarde...";

    //executando uma requisição POST para a API..
    this.httpClient.post(environment.apiUrl + "//api/Login", formLogin.value,
      { responseType: 'text' })
      .subscribe( //obtem o retorno da API (RESPONSE)
        data => { //resposta de sucesso!
          // this.mensagem = data.toString(); //exibindo a resposta da API token
          formLogin.reset(); //limpar os campos do formulário
          // //gravar o TOKEN em um arquivo de COOKIE
          var token = data.toString();
          // alert(token);
          this.cookieService.set('acess_token', token);

          // //redirecionar para a página inicial do projeto
           window.location.href = "/"; //raiz do projeto

        },
        e => { //resposta de erro!

          this.mensagem = ""; //limpando a mensagem de 'processando'

          if (e.status == 400) { //BAD REQUEST (erro de validação)
            //capturando os erros retornados pela API em JSON
            const response = JSON.parse(e.error);

            this.errosEmail = response.Email; 
            this.errosSenha = response.Senha; 
          }
          else if (e.status == 403) { //FORBIDDEN (Email já cadastrado)
            this.mensagem = e.error.toString();
          }
          else {
            
          }          
        }
      )
  }

}
