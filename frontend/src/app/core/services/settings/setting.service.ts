import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private archivedKey = 'showArchivedTasks';
  private showArchivedSubject = new BehaviorSubject<boolean>(this.getInitialValue());
  showArchived$ = this.showArchivedSubject.asObservable();

  private getInitialValue(): boolean {
    return localStorage.getItem(this.archivedKey) !== 'false';
  }

  toggleShowArchived() {
    const current = this.showArchivedSubject.value;
    const newValue = !current;

    localStorage.setItem(this.archivedKey, String(newValue));
    this.showArchivedSubject.next(newValue);
  }
}
