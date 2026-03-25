import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  private onlineUsersSubject = new BehaviorSubject<string[]>([]); 
  onlineUsers$ = this.onlineUsersSubject.asObservable();

  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000', {
      autoConnect: false 
    });

    this.socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });

    this.socket.on('onlineUsers', (users: string[]) => {
      this.onlineUsersSubject.next(users);
    });
  }

  registerUser(userId: string) {
    if (!this.socket.connected) {
      this.socket.connect();
    }
    this.socket.emit('register', userId);
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }
 
  listenNotifications(): Observable<any> {
 
    return new Observable(observer => {
 
      this.socket.on('notification', (data) => {
        observer.next(data);
      });
 
    });
 
  }
}
