import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-app',
  standalone: true,
    imports: [
        SidebarComponent,
        RouterOutlet,
        NavbarComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    showSidebar = true;

    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // Masquer le sidebar sur les pages login et register
                this.showSidebar = !(event.url === '/auth/login' || event.url === '/auth/register');
            }
        });
    }

}
