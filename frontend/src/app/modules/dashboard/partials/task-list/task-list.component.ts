import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Task, TaskService } from '../../../../core/services/task/task.service';

@Component({
  selector: 'app-task-list',
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  @Input() tasks: Task[] = [];

  loading = false;
  error = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (res) => { 
        this.tasks = res.slice(0, 5);
        this.loading = false; 
      },
      error: (err) => { 
        console.error('loadTasks error', err);
        this.error = err?.error?.message || err.message || 'Failed to load tasks';
        this.loading = false;
      }
    });
  }

}
