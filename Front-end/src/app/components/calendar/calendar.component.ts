import {Component, OnDestroy, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarComponent, FullCalendarModule} from "@fullcalendar/angular";

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
    imports: [
        FullCalendarModule
    ],
    standalone: true
})
export class CalendarComponent implements OnDestroy{
    @ViewChild(FullCalendarComponent) calendarComponent!: FullCalendarComponent;

    ngOnDestroy(): void {
        // Ensure FullCalendar instance is properly removed
        if (this.calendarComponent) {
            this.calendarComponent.getApi().destroy();
        }
    }

  calendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [
      { title: 'Check-up', date: '2024-03-05' },
      { title: 'Surgery', date: '2024-03-10' },
    ],
  };
}
