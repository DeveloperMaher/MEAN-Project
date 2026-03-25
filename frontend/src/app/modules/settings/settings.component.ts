import { Component, OnInit } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { NgClass, NgIf } from '@angular/common';
import { SettingService } from '../../core/services/settings/setting.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserService } from '../../core/services/user/user.service';
import { ToastService } from '../../core/services/toastr/toast.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification/notification.service';

@Component({
  selector: 'app-settings',
  imports: [ThemeComponent, NgClass, NgIf, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{
  message = '';

  soundEnabled = true;
  showArchived = true;

  showPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  showDeleteModal = false;


  constructor(
    private notificationService: NotificationService,
    private settingsService: SettingService,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.soundEnabled = this.notificationService.isSoundEnabled();
    
    this.settingsService.showArchived$.subscribe(value => {
      this.showArchived = value;
    });
  }

  toggleSound() {
    this.notificationService.toggleSound();
    this.soundEnabled = this.notificationService.isSoundEnabled();
  }

  toggleShowArchivedTasks() {
    this.settingsService.toggleShowArchived(); 
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  changePassword() {
    const data = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };

    if (this.newPassword.trim().length < 6) {
      this.toastr.showsErrorMsg('Password must be at least 6 characters');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.toastr.showsErrorMsg('Passwords do not match');
      return;
    }

    this.userService.changePassword(data).subscribe({
      next: () => {
        this.toastr.showsSuccessMsg('Password updated successfully');
        setTimeout(() => {
          this.logout();
        }, 2000);
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        this.message = err.error?.message || 'Update Password failed';
        this.toastr.showsErrorMsg(this.message);
      }
    });
  }


  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  deleteAccountConfirmed() {
    this.userService.deleteAccount().subscribe({
      next: () => {
        this.toastr.showsSuccessMsg('Account deleted successfully');
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
