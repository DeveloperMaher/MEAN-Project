import { Component, OnInit } from '@angular/core';
import { StatsComponent } from '../partials/stats/stats.component';
import { NgFor, NgIf } from '@angular/common';
import { TaskListComponent } from '../partials/task-list/task-list.component';
import { Task, TaskService } from '../../../core/services/task/task.service';
import { User, UserService } from '../../../core/services/user/user.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toastr/toast.service';

@Component({
  selector: 'app-dashboard-home',
  imports: [StatsComponent, TaskListComponent, NgFor, NgIf, FormsModule, TaskListComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent implements OnInit{
 // filter the Tasks
  tasks: Task[] = [];
  selected: string = 'all';
  selectedUser: string = 'all';

  // create task 
  title = '';
  description = '';
  status = 'pending';

  users: User[] = [];
  selectedUserId: string | null = null;
  loading = false;
  error = '';

  // Sample data for cards
  user_name: string = '';
  user_email: string = '';
  
  constructor(
    private authService: AuthService, 
    private userService: UserService,
    private taskService: TaskService,
    private toastr: ToastService
  ){}

  ngOnInit(): void {
    this.user_name = localStorage.getItem('userName')!;
    this.user_email = localStorage.getItem('userEmail')!;
    this.loadUsers();
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });
  }
 
  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || err.message || 'Failed to load users';
        console.error('getUsers error', err);
        this.loading = false;
      }
    });
  }
  

  createTask(form: any) {
    const taskData = {
      title: this.title,
      description: this.description,
      status: this.status,
      assignedTo: this.selectedUserId
    };

    this.taskService.createTask(taskData).subscribe({
      next: (res) => {
        this.toastr.showsSuccessMsg('Task created successfully');
        form.resetForm({
          status: 'pending' 
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
