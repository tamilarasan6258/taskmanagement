import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { authGuard } from './guards/auth.guard';
import { FrontPageComponent } from './components/front-page/front-page.component';

export const routes: Routes = [
   { path: '', component: FrontPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'projects/:id',
    component: KanbanBoardComponent,
    canActivate: [authGuard]
  }
];
