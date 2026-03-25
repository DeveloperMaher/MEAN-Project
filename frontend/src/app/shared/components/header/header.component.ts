import { Component } from '@angular/core';
import { NotificationBellComponent } from '../../../modules/notification/notification-bell/notification-bell.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { SidebarService } from '../../../core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  imports: [NotificationBellComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css' 
})
export class HeaderComponent {

  constructor(private authService: AuthService, private sidebarService: SidebarService){}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
