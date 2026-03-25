import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ToastService } from '../../../../core/services/toastr/toast.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isSubmitting: boolean = false;
  pw: string = 'password';
  eye_icon: string = 'eye-slash';

  name = '';
  email = '';
  password = '';
  message = '';
 
  constructor(
    private authService: AuthService, 
    private toastr : ToastService, 
    private router: Router) { }
 
  register(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.isSubmitting = true;
    this.authService.register({ name: this.name, email: this.email, password: this.password })
      .subscribe({
         next: () => {
        // save email temporarily for OTP page
        localStorage.setItem('userName', this.email);

        this.router.navigate(['/verify-otp']);
        this.isSubmitting = false;
      },
        error: (err) => {
          this.message = err.error?.message || 'Register failed';
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
