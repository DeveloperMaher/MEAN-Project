import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../../core/services/user/user.service';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Task, TaskService } from '../../../core/services/task/task.service';
import { FormsModule, NgModel } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { SocketService } from '../../../core/services/socket-io/socket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [NgIf, NgFor, DatePipe, NgClass, FormsModule, SpinnerComponent, AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  onlineUsers$: Observable<string[]>;
  tasks: Task[] = [];
  
  users: User[] = [];
  filteredUsers: User[] = [];
  search: string = '';

  loading = false;
  error = '';

  constructor(
    private userService: UserService, 
    private taskService: TaskService,
    private socketService: SocketService
  ){
    this.onlineUsers$ = this.socketService.onlineUsers$;
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });

    this.userLoad();
  }

  userLoad() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || err.message || 'Failed to load users';
        console.error('getUsers error', err);
        this.loading = false;
      }
    })
  }

  getTasksForUser(id : string) {
    return this.tasks.filter(t => t.assignedTo._id === id).length;
  }

  searchUser(searchInput: string){
    const value = searchInput.trim().toLowerCase();
    if(!value) {
      this.filteredUsers = this.users;
    }
    this.filteredUsers = this.users.filter(u =>
      u.name.toLowerCase().includes(value) || 
      u.email?.toLowerCase().includes(value) ||
      u.role?.toLowerCase().includes(value)
    );
  }


}
