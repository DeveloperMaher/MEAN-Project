import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/auth/register/register/register.component';
import { VerifyOtpComponent } from './modules/auth/verify-otp/verify-otp/verify-otp.component';
import { LoginComponent } from './modules/auth/login/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { TasksComponent } from './modules/dashboard/tasks/tasks.component';
import { UsersComponent } from './modules/dashboard/users/users.component';
import { UserDashboardComponent } from './modules/user-dashboard/user-dashboard.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { DashboardHomeComponent } from './modules/dashboard/dashboard-home/dashboard-home.component';
import { ArchivTaskComponent } from './modules/dashboard/archiv-task/archiv-task.component';
import { UserTaskComponent } from './modules/user-dashboard/user-task/user-task.component';
import { HomeComponent } from './modules/user-dashboard/home/home.component';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard]
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [noAuthGuard]
  },

  {
    path: 'verify-otp',
    component: VerifyOtpComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    children: [
      { path: '', component: DashboardHomeComponent, pathMatch: 'full' },
      { path: 'tasks', component: TasksComponent },
      { path: 'archived', component: ArchivTaskComponent },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },

  {
    path: 'user-dashboard',
    component : UserDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'user' },
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'usertasks', component: UserTaskComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
 
];
