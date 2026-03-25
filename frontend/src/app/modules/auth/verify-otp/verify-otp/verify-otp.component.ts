import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toastr/toast.service';

@Component({
  selector: 'app-verify-otp',
  imports: [FormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {
  email = '';
  otp = '';
  message = '';
 
  constructor(
    private authService: AuthService, 
    private toastr : ToastService, 
    private router: Router) { }
 
  verifyOtp() {
    this.authService.verifyOtp({ email: this.email, otp: this.otp })
      .subscribe({
         next: () => {
        // navigate to otp page
        this.router.navigate(['/login']);
      },
        error: (err) => {
          this.message = err.error?.message || 'Verify failed';
          this.toastr.showsErrorMsg(this.message);
        }
      });
  }
}
