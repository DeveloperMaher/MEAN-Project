import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface Notification {
  _id: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface NotificationResponse {
  notifications: Notification[];
  unreadCount: number;
}

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  private apiUrl = "http://localhost:3000/api/notifications";
  private audio = new Audio('notification.mp3'); 
  private soundKey = 'notificationSound';

  constructor(private http: HttpClient) {}
 
  getNotifications(userId: string): Observable<NotificationResponse> {
    return this.http.get<NotificationResponse>(`${this.apiUrl}/${userId}`);
  }
 
  markRead(id: string) {
    return this.http.patch(`${this.apiUrl}/${id}/read`, {});
  }

  playSound() {
    const enabled = localStorage.getItem(this.soundKey);
    if (enabled === 'off') return;

    this.audio.currentTime = 0;
    this.audio.play().catch(() => {}); 
  }

  toggleSound() {
    const current = localStorage.getItem(this.soundKey);
    const newValue = current === 'off' ? 'on' : 'off';
    localStorage.setItem(this.soundKey, newValue);
  }

  isSoundEnabled(): boolean {
    return localStorage.getItem(this.soundKey) !== 'off';
  }

}