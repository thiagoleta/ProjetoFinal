import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CadastrarPacienteComponent } from './paciente/cadastrar-paciente/cadastrar-paciente.component';
import { ConsultarPacienteComponent } from './paciente/consultar-paciente/consultar-paciente.component';
import { CadastrarMedicoComponent } from './medico/cadastrar-medico/cadastrar-medico.component';
import { ConsultarMedicoComponent } from './medico/consultar-medico/consultar-medico.component';
import { CadastrarAtendimentoComponent } from './atendimento/cadastrar-atendimento/cadastrar-atendimento.component';
import { ConsultarAtendimentoComponent } from './atendimento/consultar-atendimento/consultar-atendimento.component';


// //importando a biblioteca para mapeamento de rotas no angular
import { RouterModule, Routes } from '@angular/router';

// //biblioteca para desenvolvimento de formulários dinâmicos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// //biblioteca para executar as chamadas HTTP (POST, PUT, GET, DELETE) para uma API
import { HttpClientModule } from '@angular/common/http';
// import { Component } from '.c:/Users/thiago.leta/Desktop/Pojeto Final/WebProjetoFinal/projetoFinal/src/.component';
// import { Component } from './.component';
import { CadastroUsuarioComponent } from './cadastroUsuario/cadastroUsuario.component';
import { LoginUsuarioComponent } from './loginUsuario/loginUsuario.component';

//biblioteca para manipulação de cookies
import { CookieService } from 'ngx-cookie-service';
import { from } from 'rxjs';


// //mapeando as URLs do projeto para abrir cada componente
const appRoutes: Routes = [
    {
        path: 'cadastrar-paciente',
        component: CadastrarPacienteComponent
    },
    {
        path: 'consultar-paciente',
        component: ConsultarPacienteComponent
    },
    {
        path: 'cadastrar-medico',
        component: CadastrarMedicoComponent
    },
    {
        path: 'consultar-medico',
        component: ConsultarMedicoComponent
    },
    {
        path: 'cadastrar-atendimento',
        component: CadastrarAtendimentoComponent
    },
    {
        path: 'consultar-atendimento',
        component: ConsultarAtendimentoComponent
    },
    {
        path: 'cadastrar-usuario',
        component: CadastroUsuarioComponent
    },
    {
        path: 'autenticar-usuario',
        component: LoginUsuarioComponent
    }
];


@NgModule({
    declarations: [
        AppComponent,
        CadastrarPacienteComponent,
        ConsultarPacienteComponent,
        CadastrarMedicoComponent,
        ConsultarMedicoComponent,
        CadastrarAtendimentoComponent,
        ConsultarAtendimentoComponent,
        CadastroUsuarioComponent,
        LoginUsuarioComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [CookieService],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
