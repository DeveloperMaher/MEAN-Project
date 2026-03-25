import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


export interface AssignedTo { 
  _id: string; 
  name: string; 
  email?: string; 
}

export interface Task { 
  _id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: AssignedTo;
  isArchived: boolean;
  createdAt?: string;
}

export interface UpdateTaskStatusResponse {
  success: boolean;
  data: Task;
}

export interface RestoreTaskResponse {
  success: boolean;
  data: Task;
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  getArchivedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/archived`);
  }

  getTasksForUser(): Observable<Task[]> {
    return this.http.get<{ success: boolean, data: Task[] }>(`${this.apiUrl}/usertasks`)
    .pipe(
      map(response => response.data)   
    );
  }

  updateTaskStatus(taskId: string, status: string): Observable<UpdateTaskStatusResponse> {
    return this.http.patch<UpdateTaskStatusResponse>(`${this.apiUrl}/status`, { taskId, status });
  }

  archivTask(taskId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/archive/${taskId}`, {});
  }

  restoreTask(taskId: string): Observable<RestoreTaskResponse> {
    return this.http.patch<RestoreTaskResponse>(`${this.apiUrl}/restore/${taskId}`, {taskId})
  }
}
