import { Component, HostListener, OnInit } from '@angular/core';
import { SocketService } from '../../../core/services/socket-io/socket.service';
import { DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NotificationService } from '../../../core/services/notification/notification.service';

@Component({
  selector: 'app-notification-bell',
  imports: [NgFor, NgIf, DatePipe, NgClass, NgTemplateOutlet],
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.css'
})
export class NotificationBellComponent implements OnInit {
 
  notifications: any[] = [];
  unreadCount = 0;
  dropdownOpen = false;
 
  userId?: string | null;
 
  constructor(
    private notificationService: NotificationService,
    private socketService: SocketService,
    private authService: AuthService
  ) {}
 
  @HostListener('document:keydown.escape')
    onEscape() {
      this.dropdownOpen = false;
    }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.socketService.registerUser(this.userId!);
 
    this.loadNotifications();
 
    this.socketService.listenNotifications()
      .subscribe((notification:any)=>{
        this.notifications.unshift(notification);
        this.unreadCount++;
        this.notificationService.playSound();
      });
   }
 
  loadNotifications() {
    this.notificationService
      .getNotifications(this.userId!)
      .subscribe(res => {
        this.notifications = res.notifications;
        this.unreadCount = res.unreadCount;
      });
  }
 
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
 
  markAsRead(notification:any) {
    if(notification.read) return;
    this.notificationService
      .markRead(notification._id)
      .subscribe(()=>{
        notification.read = true;
        this.unreadCount--;
      });
  }
 
}
 
