import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { SocketService } from '../socket-io/socket.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth'; 

  constructor(private http: HttpClient, private router:Router, private socketService: SocketService) { }

  register(data: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
 
  verifyOtp(data: { email: string, otp: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, data);
  }
 
  login(data: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Save token after login
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Payload from JWT
  getTokenPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode(token); // z.B. { id: '123', role: 'admin',.......}
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  getUserId(): string | null {
    const payload = this.getTokenPayload();
    return payload?.sub || payload?.id || null;
  }

  isAdmin(): boolean {
    const payload = this.getTokenPayload();
    return payload?.role === 'admin';
  }

  logout() {
    this.socketService.disconnect();

    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');

    this.router.navigate(['/login']);
  }

  
  
}
