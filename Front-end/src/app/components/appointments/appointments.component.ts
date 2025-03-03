import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../models/appointment';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { ApiService } from '../../services/api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  newAppointment: Partial<Appointment> = this.initializeNewAppointment();
  loading = false;
  error = '';
  isEditing = false;
  selectedAppointment: Appointment | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadInitialData();
  }

  private initializeNewAppointment(): Partial<Appointment> {
    return {
      patientId: null,  // Make sure this matches the type expected by Appointment
      doctorId: null,   // Make sure this matches the type expected by Appointment
      appointmentDate: '', // Empty string for date
      appointmentTime: '', // Empty string for time
      description: ''      // Empty string for description
    };
  }

  private loadInitialData() {
    this.loading = true;

    forkJoin({
      appointments: this.apiService.getAppointments(),
      doctors: this.apiService.getDoctors(),
      patients: this.apiService.getPatients()
    }).subscribe({
      next: ({ appointments, doctors, patients }) => {
        this.appointments = appointments;
        this.doctors = doctors;
        this.patients = patients;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading data';
        console.error(error);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.validateAppointment()) {
      this.loading = true;

      if (this.isEditing && this.selectedAppointment?.id) {
        this.apiService.updateAppointment(this.selectedAppointment.id, this.newAppointment as Appointment).subscribe({
          next: () => {
            alert('Appointment updated successfully!');
            this.loadInitialData();
            this.resetForm();
          },
          error: (error) => {
            this.error = 'Error updating appointment';
            console.error(error);
            this.loading = false;
          }
        });
      } else {
        this.apiService.createAppointment(this.newAppointment as Appointment).subscribe({
          next: () => {
            alert('Appointment created successfully!');
            this.loadInitialData();
            this.resetForm();
          },
          error: (error) => {
            this.error = 'Error creating appointment';
            console.error(error);
            this.loading = false;
          }
        });
      }
    }
  }

  resetForm() {
    this.newAppointment = this.initializeNewAppointment();
    this.isEditing = false;
    this.selectedAppointment = null;
  }

  getPatientName(patientId: number | null): string {
    const patient = this.patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
  }

  getDoctorName(doctorId: number | null): string {
    const doctor = this.doctors.find(d => d.id === doctorId);
    return doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'Unknown';
  }

  formatTime(time: string | undefined): string {
    if (!time) return '';
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  editAppointment(appointment: Appointment) {
    this.newAppointment = { ...appointment };
    this.isEditing = true;
    this.selectedAppointment = appointment;
  }

  deleteAppointment(id: number | undefined) {
    if (id === undefined) {
      console.error('Cannot delete appointment: ID is undefined');
      return;
    }

    if (confirm('Are you sure you want to delete this appointment?')) {
      this.apiService.deleteAppointment(id).subscribe({
        next: () => {
          alert('Appointment deleted successfully!');
          this.loadInitialData();
        },
        error: (error) => {
          this.error = 'Error deleting appointment';
          console.error(error);
        }
      });
    }
  }

  private validateAppointment(): boolean {
    if (
        this.newAppointment.patientId === null ||
        this.newAppointment.doctorId === null ||
        !this.newAppointment.appointmentDate ||
        !this.newAppointment.appointmentTime
    ) {
      this.error = 'Please fill in all required fields.';
      console.error('Validation error:', this.newAppointment);
      return false;
    }
    return true;
  }
}
