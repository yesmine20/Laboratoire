import { Component } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, AngularFireAuthModule, MatCardModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '';
  password: string = '';

  constructor(
    private AS: AuthService,
    private router: Router
  ) { }

  login() {
    // Récupérer email et password
    const message: string = 'bonjour';
    console.log(message);

    console.log(this.email, this.password);

    // Appeler le service d'authentification
    this.AS.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        // Si la connexion réussit
        this.router.navigate(['/member']);
      })
      .catch((error) => {
        // Si la connexion échoue
        console.log(error);
      });
  }

}

