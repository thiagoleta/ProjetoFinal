import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean;
  // //injeção de dependência (inicialização)
  constructor(private cookieService: CookieService) {
  }
  // //função executada sempre que o componente é renderizado
  ngOnInit(): void {
    // //ler o COOKIE gravado no navegador do usuário
    var token = this.cookieService.get('acess_token');
    this.isAuthenticated = (token != null && token.length > 0)
    
  }
  // //função para fazer o logout do usuário
  logout() {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      // //remover o cookie gravado
      this.cookieService.delete('access_token');
      // //redirecionamento
      window.location.href = "/autenticar-usuario";
    }
  }
}
