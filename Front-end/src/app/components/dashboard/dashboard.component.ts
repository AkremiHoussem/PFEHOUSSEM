import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { MapComponent } from '../map/map.component'; // Import MapComponent
import { CalendarComponent } from '../calendar/calendar.component';
import {CommonModule} from "@angular/common";
import {ChatComponent} from "../chat/chat.component"; // Import CalendarComponent

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
    imports: [CommonModule, MapComponent, CalendarComponent, ChatComponent], // Add components here
  standalone: true,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  isChatVisible = true;

  ngAfterViewInit() {
    // Initialize Chart
    new Chart('salesChart', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Appointments',
          data: [30, 50, 40, 60, 70],
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 2
        }]
      }
    });

    // Resize event fix
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }
  /*ngOnInit() {
    this.loadChart();
  }*/

  loadChart() {
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Confirmés', 'Annulés', 'En attente'],
        datasets: [{
          label: 'Rendez-vous',
          data: [120, 40, 25],
          backgroundColor: ['#4CAF50', '#F44336', '#FFC107']
        }]
      }
    });
  }
}
