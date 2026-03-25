import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../../../core/services/task/task.service';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {

  tasks: Task[] = [];
  
  constructor(
    private taskService: TaskService
  ){}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });
  }

   get pendingTasks() {
    return this.tasks.filter(t => t.status === 'pending').length;
  }

  get inProgressTasks() {
    return this.tasks.filter(t => t.status === 'in-progress').length;
  }

  get doneTasks() {
    return this.tasks.filter(t => t.status === 'done').length;
  }

}
