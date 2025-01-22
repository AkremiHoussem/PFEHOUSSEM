import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Add RouterLinkActive here
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="wrapper">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="sidebar-header">
          <h3>{{name}}</h3>
        </div>
        <ul class="sidebar-nav">
          <li><a routerLink="/dashboard" routerLinkActive="active">
            <i class="bi bi-speedometer2"></i> Dashboard
          </a></li>
          <li><a routerLink="/patients" routerLinkActive="active">
            <i class="bi bi-people"></i> Patients
          </a></li>
          <li><a routerLink="/doctors" routerLinkActive="active">
            <i class="bi bi-hospital"></i> Doctors
          </a></li>
          <li><a routerLink="/appointments" routerLinkActive="active">
            <i class="bi bi-calendar-check"></i> Appointments
          </a></li>
        </ul>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .wrapper {
      display: flex;
      min-height: 100vh;
    }
    .sidebar {
      width: 250px;
      background: #333;
      color: white;
      padding: 20px;
    }
    .sidebar-header {
      padding: 20px 0;
      text-align: center;
    }
    .sidebar-nav {
      list-style: none;
      padding: 0;
    }
    .sidebar-nav li {
      margin: 10px 0;
    }
    .sidebar-nav a {
      color: white;
      text-decoration: none;
      display: block;
      padding: 10px;
      border-radius: 5px;
    }
    .sidebar-nav a:hover, .sidebar-nav a.active {
      background: #555;
    }
    .main-content {
      flex: 1;
      padding: 20px;
    }
    i {
      margin-right: 10px;
    }
  `],
  imports: [RouterOutlet, RouterLink, RouterLinkActive]
})
export class App {
  name = 'Hospital Management System';
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
});
