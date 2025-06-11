import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PasswordResetService } from '../../services/password-reset/password-reset.service';
 
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  uname = '';
  password = '';
  msg = '';
  showForgotPassword = false;
  resetEmail = '';
  resetEmailSent = false;
 
  constructor(
    private auth: AuthService,
    private router: Router,
    private passwordResetService: PasswordResetService
  ) {}


  menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}
 
  login() {
    const user = { uname: this.uname, password: this.password };
    this.auth.login(user).subscribe({
      next: res => {
        this.msg = res.msg;
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.msg = err.error.msg || 'Login failed';
      }
    });
  }
 
  requestPasswordReset() {
    if (!this.resetEmail) {
      this.msg = 'Please enter your email';
      return;
    }
 
    this.passwordResetService.requestPasswordReset(this.resetEmail).subscribe({
      next: () => {
        this.resetEmailSent = true;
        this.msg = 'Password reset email sent. Please check your inbox.';
      },
      error: err => {
        this.msg = err.error.msg || 'Failed to send reset email';
      }
    });
  }
}