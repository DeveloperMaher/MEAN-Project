import { Component } from '@angular/core';
import { Task, TaskService } from '../../../core/services/task/task.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toastr/toast.service';
import { User, UserService } from '../../../core/services/user/user.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-tasks',
  imports: [NgIf, NgFor, NgClass, FormsModule, SpinnerComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})

export class TasksComponent {
  tasks: Task[] = []

  selected: string = 'all';
  selectedUser: string = 'all';
  search: string = '';
  
  users: User[] = [];  

  loading = false;
  error = '';

  constructor(
    private taskService: TaskService, 
    private userService: UserService, 
    private toastr: ToastService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsers();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (res) => { 
        this.tasks = res; 
        this.loading = false; 
      },
      error: (err) => { 
        console.error('loadTasks error', err);
        this.error = err?.error?.message || err.message || 'Failed to load tasks';
        this.loading = false;
      }
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

  archiveTask(taskId: string) {
    this.taskService.archivTask(taskId).subscribe((res) => {
      this.toastr.showsSuccessMsg(res.message);
      this.loadTasks();
    });
  }

  get filteredTasksCombined(): Task[] {
    let result = [...this.tasks];

    // status filter
    if (this.selected !== 'all') {
      result = result.filter(t => t.status === this.selected);
    }

    // user filter
    if (this.selectedUser !== 'all') {
      result = result.filter(t => t.assignedTo?.name === this.selectedUser);
    }

    // search filter
    const value = this.search.trim().toLowerCase();
    if (value) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(value) ||
        t.description.toLowerCase().includes(value) ||
        t.assignedTo?.name.toLowerCase().includes(value) ||
        t.status.toLowerCase().includes(value)
      );
    }

    return result;
  }

}
