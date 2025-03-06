import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [
        FormsModule
    ],
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  onLogin() {
    console.log("Login attempt:", this.email, this.password, this.rememberMe);
    // Ici, tu peux ajouter l'intégration avec le backend Spring Boot
  }
}
