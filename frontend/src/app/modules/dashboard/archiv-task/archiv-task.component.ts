import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../../core/services/task/task.service';
import { NgFor, NgIf } from '@angular/common';
import { ToastService } from '../../../core/services/toastr/toast.service';

@Component({
  selector: 'app-archiv-task',
  imports: [NgFor, NgIf],
  templateUrl: './archiv-task.component.html',
  styleUrl: './archiv-task.component.css'
})
export class ArchivTaskComponent implements OnInit{

  archivedTasks: Task[] = []
  
  loading = false;
  error = '';
  constructor(private taskService: TaskService, private toastr: ToastService){}

  ngOnInit(): void {
    this.loadArchivedTasks();
  }

  loadArchivedTasks(){
    this.loading = true;
    this.taskService.getArchivedTasks().subscribe({
      next: (res) => { 
        this.archivedTasks = res; 
        this.loading = false; 
      },
      error: (err) => { 
        console.error('loadTasks error', err);
        this.error = err?.error?.message || err.message || 'Failed to load tasks';
        this.loading = false;
      }
    });
  }

  //  changeStatus(task: Task, newStatus: string) {
  //   const oldStatus = task.status;

  //   task.status = newStatus;

  //   this.taskService.updateTaskStatus(task._id, newStatus).subscribe({
      
  //     next: (res) => {
  //       console.log('Updated successfully', res);
  //       task.status = res.data.status;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       task.status = oldStatus;
  //     }
  //   });
  // }
   restoreTask(taskId: string) {
    this.taskService.restoreTask(taskId).subscribe(() => {
      this.toastr.showsSuccessMsg('Task restored');
      this.loadArchivedTasks();
    });
  }

}
