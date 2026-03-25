import { Component, HostListener, OnInit } from '@angular/core';
import { Task, TaskService } from '../../../core/services/task/task.service';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { NgIf } from '@angular/common';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);


@Component({
  selector: 'app-task-chart',
  imports: [NgIf],
  templateUrl: './task-chart.component.html',
  styleUrl: './task-chart.component.css'
})
export class TaskChartComponent implements OnInit{
  chart!: Chart; 

  tasks: Task[] = [];

  @HostListener('window:resize')
  onResize() {
    this.chart?.resize();
  }

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }
  
  loadTasks() {
    this.taskService.getTasksForUser().subscribe(tasks => {
      this.tasks = tasks;
      if(this.tasks.length > 0){
        setTimeout(() => this.createChart(), 1000);
      }
    });
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark');
  }

  createChart() {
    const pending = this.tasks.filter(t => t.status === 'pending').length;
    const inProgress = this.tasks.filter(t => t.status === 'in-progress').length;
    const done = this.tasks.filter(t => t.status === 'done').length;
    const isDark = this.isDarkMode();

    new Chart('taskChart', {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'In Progress', 'Done'],
        datasets: [{
          data: [pending, inProgress, done],
          backgroundColor: [
            '#facc15', 
            '#3b82f6',
            '#22c55e' 
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 0, 
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: isDark ? '#ffffff' : '#000000' 
            },
          },
        }
      }
    });
  }
}
