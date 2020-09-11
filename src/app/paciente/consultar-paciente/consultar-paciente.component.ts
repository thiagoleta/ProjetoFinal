import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-consultar-paciente',
  templateUrl: './consultar-paciente.component.html',
  styleUrls: ['./consultar-paciente.component.css']
})
export class ConsultarPacienteComponent implements OnInit {
  // //atributo
  listagemPaciente=[];
  mensagemExclusao:string;

  mensagemEdicao:string;

  errosNome: [];
  errosCpf: [];
  errosTelefone: [];
  errosEmail: [];
  errosDataNasc = [];
  mensagem: string;


  // //dados  retorno do metodo obeter por ID para jogar na tela de edição ja preenchida
  pacienteEdicao = {
    idPaciente : 0,
    nome : '',
    cpf : '',
    dataNascimento : '',
    telefone : '',
    email: ''
  };

  httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient,
    private cookieService:CookieService) { }

  ngOnInit(): void {
    this.createHttpHeaders();
    this.consultarPacientes();
  }
    consultarPacientes(){
      this.httpClient.get("http://thiagoleta2-001-site3.htempurl.com//api/paciente", {headers: this.httpHeaders})
      .subscribe(
        (data:any[]) => {
          this.listagemPaciente = data;
        // console.log(data);
        }
      )
    }

    excluirPaciente(idPaciente){
      // alert(idPaciente);
      if(confirm('Deseja realmente excluir este Cliente?')){

        //realizando uma chamada DELETE para a API
        this.httpClient.delete("http://thiagoleta2-001-site3.htempurl.com//api/paciente/" + idPaciente,{ responseType : 'text', headers: this.httpHeaders })
            .subscribe(
              data => { //recebendo o retorno de sucesso
                        //da API (PROMISSE)
                this.mensagemExclusao = data.toString();
                this.consultarPacientes();
                //executando a função de consulta
              },
              e => { //recebendo o retorno de erro da API (PROMISSE)
                this.mensagemExclusao = e.toString();
              }
            );
      }
    }

      //função para buscar 1 cliente na API atraves do id
  obterPaciente(idPaciente){

    // //limpando as mesag quando a modal abrir
    this.errosNome = [];
    this.errosCpf = [];
    this.errosTelefone = [];
    this.errosEmail = [];    
    this.mensagemEdicao = '';

    //acessando a API e buscar os dados do cliente atraves do id
    this.httpClient.get("http://thiagoleta2-001-site3.htempurl.com//api/paciente/" + idPaciente, {headers:this.httpHeaders})
      .subscribe(
        (data:any) => {
          // alert(JSON.stringify(data));
          this.pacienteEdicao = data;
        },
        e => {
          console.log(e);
        }
      );
  }

  editarPaciente(forEdicao){
    // //limpando as mensagens de erro
    // console.log(formCadastro.value.dataNasc);
    this.errosNome = [];
    this.errosCpf = [];
    this.errosTelefone = [];
    this.errosEmail = [];    
    this.mensagemEdicao = 'Processando requisição, por favor aguarde...';

    this.httpClient.put("http://thiagoleta2-001-site3.htempurl.com//api/paciente",
    forEdicao.value,
      { responseType: 'text', headers:this.httpHeaders })
      .subscribe(
        data => {
          this.mensagemEdicao = data.toString();
          this.consultarPacientes();
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
