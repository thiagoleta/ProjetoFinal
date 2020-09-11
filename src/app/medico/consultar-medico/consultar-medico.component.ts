import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-consultar-medico',
  templateUrl: './consultar-medico.component.html',
  styleUrls: ['./consultar-medico.component.css']
})
export class ConsultarMedicoComponent implements OnInit {

  listaMedico =[];
  mensagemExclusao:string;

  mensagemEdicao:string;

  // //para pegar as mesagems de validacao da api caso de erro na edicao
  errosNome: [];
  crm: [];
  especializacao: [];
  mensagem: string;

// //para jogar em casa no campo do formulario de edicao
  medicoEdicao = {
    idMedico : 0,
    nome : '',
    crm : '',
    especializacao : ''
  };

  httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.createHttpHeaders();
    this.consultarMedico();
  }  
    consultarMedico (){
      this.httpClient.get("http://thiagoleta2-001-site3.htempurl.com//api/medico",{ headers: this.httpHeaders })
      .subscribe(
        (data:any[]) => {
          this.listaMedico = data;
        //  console.log(data);
        }
      )
    }

    excluirMedico(idMedico){
      // alert(idMedico);
      if(confirm('Deseja realmente excluir este Cliente?')){

        //realizando uma chamada DELETE para a API
        this.httpClient.delete("http://thiagoleta2-001-site3.htempurl.com//api/medico/" + idMedico,
        { responseType: 'text', headers: this.httpHeaders })
            .subscribe(
              data => { //recebendo o retorno de sucesso 
                        //da API (PROMISSE)
                this.mensagemExclusao = data.toString();
                this.consultarMedico(); 
                //executando a função de consulta
              },
              e => { //recebendo o retorno de erro da API (PROMISSE)
                this.mensagemExclusao = e.toString();
              }
            );
      }
    }
    obterMedico(idMedico){
      this.crm =[];
      this.errosNome=[];
      this.especializacao=[];
      this.mensagemEdicao ='';
      // console.log(idMedico);
      //acessando a API e buscar os dados do cliente atraves do id
      this.httpClient.get("http://thiagoleta2-001-site3.htempurl.com//api/medico/" + idMedico,
{ headers: this.httpHeaders })
        .subscribe(
          (data:any) => {
            // alert(JSON.stringify(data));
            this.medicoEdicao = data;
          },
          e => {
            console.log(e);
          }
        );
    }
    editarMedico(formEdicao){
      // //limpando as mensagens de erro
      errosNome: [];
      crm: [];
      especializacao: [];
  
      // //exibindo mensagem na página..
      this.mensagemEdicao = 'Processando requisição, por favor aguarde...';
  
      // //executando uma requisição POST para a API..
      this.httpClient.put("http://thiagoleta2-001-site3.htempurl.com//api/medico",
      formEdicao.value,
              { responseType: 'text', headers: this.httpHeaders })
        .subscribe(
          data => {
            this.mensagemEdicao = data.toString();
            // console.log(data);
            this.consultarMedico();
          },
          e => {
            // //capturando os erros retornados pela API em JSON
            const response = JSON.parse(e.error);
            console.log(response); 
              // //Pegando os erros de validação da APi
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
      // window.location.href = "/autenticar-usuario";
    }
  }

  }