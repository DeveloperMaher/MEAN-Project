import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../core/services/task/task.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  search: string = '';

  loading = true;
  error?: string;

  constructor(private taskService: TaskService, private authService: AuthService){}

  ngOnInit(): void {
    this.tasksLoad();
  }

  tasksLoad() {
    this.taskService.getTasksForUser().subscribe({
     next: tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
      this.loading = false;
     }, 
     error: err => {
        console.error('Failed to load user tasks', err);
        this.error = err?.error?.message || err.message || 'Failed to load tasks';
        this.loading = false;
     }
    })
  }

  searchTask(searchInput: string){
    const value = searchInput.trim().toLowerCase();
  
    if(!value){
      this.filteredTasks = this.tasks;
    }

    this.filteredTasks = this.tasks.filter(t => 
      t.title.toLowerCase().includes(value) ||
      t.description.toLowerCase().includes(value) ||
      t.status.toLowerCase().includes(value)
    )
  }
  
  changeStatus(task: Task, newStatus: string) {
    const oldStatus = task.status;

    task.status = newStatus;

    this.taskService.updateTaskStatus(task._id, newStatus).subscribe({
      
      next: (res) => {
        console.log('Updated successfully', res);
        task.status = res.data.status;
      },
      error: (err) => {
        console.error(err);
        task.status = oldStatus;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
