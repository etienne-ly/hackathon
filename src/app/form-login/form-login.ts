import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginOverlayService} from '../service/login.overlay.service';

interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-login.html',
  styleUrl: './form-login.css',
})
export class FormLogin {
  private overlayService = inject(LoginOverlayService);

  closeForm(): void {
    this.overlayService.close();
  }

  credentials: LoginCredentials = {
    email: '',
    password: ''
  };

  rememberMe: boolean = false;
  showPassword: boolean = false;

  private demoCredentials: LoginCredentials = {
    email: 'demo@pizza.com',
    password: 'Pizza123!'
  };

  autoFill(fieldName: string): void {
    setTimeout(() => {
      if (fieldName === 'email') {
        this.credentials.email = this.demoCredentials.email;
      } else if (fieldName === 'password') {
        this.credentials.password = this.demoCredentials.password;
      }

      // Add visual feedback
      this.addAutoFillAnimation(fieldName);
    }, 100);
  }

  private addAutoFillAnimation(fieldName: string): void {
    const input = document.getElementById(fieldName);
    if (input) {
      input.classList.add('auto-filled');
      setTimeout(() => {
        input.classList.remove('auto-filled');
      }, 600);
    }
  }

  onLogin(): void {
    console.log('Login attempt:', {
      email: this.credentials.email,
      rememberMe: this.rememberMe
    });

    // Validate credentials
    if (!this.credentials.email || !this.credentials.password) {
      alert('⚠️ Please fill in all fields');
      return;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.credentials.email)) {
      alert('⚠️ Please enter a valid email address');
      return;
    }

    this.closeForm();
  }

}
