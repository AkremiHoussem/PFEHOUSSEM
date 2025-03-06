import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [
        FormsModule
    ],
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  termsAccepted: boolean = false;

  onRegister() {
    if (!this.termsAccepted) {
      alert("You must accept the terms and conditions!");
      return;
    }

    console.log("Register attempt:", this.fullName, this.email, this.password);
    // Ici, tu peux ajouter l'intégration avec le backend Spring Boot
  }
}
