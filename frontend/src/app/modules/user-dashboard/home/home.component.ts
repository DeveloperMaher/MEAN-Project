import { Component } from '@angular/core';
import { StatsComponent } from '../stats/stats.component';
import { TaskChartComponent } from '../task-chart/task-chart.component';

@Component({
  selector: 'app-home',
  imports: [StatsComponent, TaskChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
