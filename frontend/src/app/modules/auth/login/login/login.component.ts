import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ToastService } from '../../../../core/services/toastr/toast.service';
import { SocketService } from '../../../../core/services/socket-io/socket.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  isSubmitting: boolean = false;
  pw: string = 'password';
  eye_icon: string = 'eye-slash';
  email = '';
  password = '';
  message = '';
 
  constructor(
    private authService: AuthService,
    private socketService: SocketService,
    private toastr : ToastService, 
    private router:Router) { }

  ngOnInit(): void {}
 
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.authService.login({ email: this.email, password: this.password })
    .subscribe({
      next: (res) => {
        this.authService.setToken(res.token);

        localStorage.setItem('userName', res.user.name);
        localStorage.setItem('userEmail', res.user.email);
        localStorage.setItem('userRole', res.user.role);

        this.socketService.connect(); 
        this.socketService.registerUser(res.user._id);

        this.message = 'Login successful';
        this.toastr.showsSuccessMsg(this.message);

        const tokenPayload = this.authService.getTokenPayload();
          if (tokenPayload.role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/user-dashboard']);
          }
        this.isSubmitting = false;
      },
      error: (err) => {
        this.message = err.error?.message || 'Login failed';
        this.toastr.showsErrorMsg(this.message);
        this.isSubmitting = false; 
      }
    });
  }

  showPassword() {
    this.pw === 'password' ? this.pw = 'text' : this.pw = 'password';
    this.eye_icon === 'eye' ? this.eye_icon = 'eye-slash' : this.eye_icon = 'eye';
  }
}


