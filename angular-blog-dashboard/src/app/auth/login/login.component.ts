import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  onSubmit(loginForm: any) {
    this.auth.login(loginForm.email, loginForm.password);
  }
}
