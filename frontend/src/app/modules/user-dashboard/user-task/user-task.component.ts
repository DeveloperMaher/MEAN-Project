import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../../core/services/task/task.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { ToastService } from '../../../core/services/toastr/toast.service';

@Component({
  selector: 'app-user-task',
  imports: [NgFor, NgIf, NgClass, FormsModule, DatePipe, SpinnerComponent],
  templateUrl: './user-task.component.html',
  styleUrl: './user-task.component.css'
})
export class UserTaskComponent implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  search: string = '';

  loading = true;
  error?: string;

  constructor(private taskService: TaskService, private toastr: ToastService){}

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
        this.toastr.showsSuccessMsg('Updated successfully');
        task.status = res.data.status;
      },
      error: (err) => {
        console.error(err);
        task.status = oldStatus;
      }
    });
  }

}