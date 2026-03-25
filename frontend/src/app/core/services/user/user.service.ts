import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  _id: string;
  name: string;
  email?: string;
  role: string;
  isVerified : boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  
  changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.http.patch(`${this.apiUrl}/change-password`, data);
  }

  deleteAccount() {
    return this.http.delete(`${this.apiUrl}/delete-account`);
  }
  
}