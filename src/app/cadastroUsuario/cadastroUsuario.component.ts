import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cadastroUsuario',
  templateUrl: './cadastroUsuario.component.html',
  styleUrls: ['./cadastroUsuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  mensagem: string;

  errosNome: [];
  errosEmail: [];
  errosSenha: [];
  errosSenhaConfirmacao: [];

  httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient,
    private  cookieService :CookieService ) { }

  ngOnInit(): void {
  }


  cadastrarUsuario(formCadastro) {


    this.errosNome = [];
    this.errosEmail = [];
    this.errosSenha = [];
    this.errosSenhaConfirmacao = [];
    this.mensagem = "Processando requisição, por favor aguarde...";


    this.httpClient.post(environment.apiUrl + "/api/Usuario", formCadastro.value,  
      { responseType: 'text' })
      .subscribe(
        data => {
          this.mensagem = data.toString();
          formCadastro.reset();
        },
        e => {          

          this.mensagem = "";

          if (e.status == 400) {

            
            const response = JSON.parse(e.error);
            console.log(response);

            this.errosNome = response.Nome;
            this.errosEmail = response.Email;
            this.errosSenha = response.Senha;
            this.errosSenhaConfirmacao = response.SenhaConfirmacao;
          }
          else if (e.status == 403) {
            this.mensagem = e.error.toString();
          }
          else {
            console.log(e);
          }
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
