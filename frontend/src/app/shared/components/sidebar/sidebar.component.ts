import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { SidebarService } from '../../../core/services/sidebar/sidebar.service';
import { SettingService } from '../../../core/services/settings/setting.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isOpen$: Observable<boolean>;
  showArchived$: Observable<boolean>;
  
  constructor(
    private sidebarService: SidebarService, 
    private authService: AuthService,
    private settingsService: SettingService) {
  
    this.isOpen$ = this.sidebarService.sidebarOpen$;
    this.showArchived$ = this.settingsService.showArchived$;
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  closeSidebar() {
    this.sidebarService.closeSidebar();
  }

  logout() {
    this.authService.logout();
  }

  get userName(): string{
    return localStorage.getItem('userName')!;
  }
  get userEmail(): string{
    return localStorage.getItem('userEmail')!;
  }


}
