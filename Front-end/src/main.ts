import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container">
      <nav class="navbar">
        <ul>
          <li><a routerLink="/dashboard">Dashboard</a></li>
          <li><a routerLink="/patients">Patients</a></li>
          <li><a routerLink="/doctors">Doctors</a></li>
          <li><a routerLink="/appointments">Appointments</a></li>
        </ul>
      </nav>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  imports: [RouterOutlet, RouterLink],
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