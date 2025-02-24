import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../models/appointment';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { ApiService } from '../../services/api.service';

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
  newAppointment: Appointment = this.initializeNewAppointment();
  loading = false;
  error = '';
  isEditing = false;
  selectedAppointment: Appointment | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadInitialData();
  }

  private initializeNewAppointment(): Appointment {
    return {
      patientId: 0,
      doctorId: 0,
      dateTime: new Date(),
      status: 'Scheduled',
      notes: ''
    };
  }

  private loadInitialData() {
    this.loading = true;
    Promise.all([
      this.loadAppointments(),
      this.loadDoctors(),
      this.loadPatients()
    ]).finally(() => {
      this.loading = false;
    });
  }

  private loadAppointments() {
    return new Promise((resolve) => {
      this.apiService.getAppointments().subscribe({
        next: (data) => {
          this.appointments = data;
          resolve(true);
        },
        error: (error) => {
          this.error = 'Error loading appointments';
          console.error(error);
          resolve(false);
        }
      });
    });
  }

  private loadDoctors() {
    return new Promise((resolve) => {
      this.apiService.getDoctors().subscribe({
        next: (data) => {
          this.doctors = data;
          resolve(true);
        },
        error: (error) => {
          this.error = 'Error loading doctors';
          console.error(error);
          resolve(false);
        }
      });
    });
  }

  private loadPatients() {
    return new Promise((resolve) => {
      this.apiService.getPatients().subscribe({
        next: (data) => {
          this.patients = data;
          resolve(true);
        },
        error: (error) => {
          this.error = 'Error loading patients';
          console.error(error);
          resolve(false);
        }
      });
    });
  }

  onSubmit() {
    if (this.validateAppointment()) {
      this.loading = true;
      if (this.isEditing && this.selectedAppointment?.id) {
        this.apiService.updateAppointment(this.selectedAppointment.id, this.newAppointment).subscribe({
          next: () => {
            this.loadAppointments();
            this.resetForm();
            this.loading = false;
          },
          error: (error) => {
            this.error = 'Error updating appointment';
            console.error(error);
            this.loading = false;
          }
        });
      } else {
        this.apiService.createAppointment(this.newAppointment).subscribe({
          next: () => {
            this.loadAppointments();
            this.resetForm();
            this.loading = false;
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

  private validateAppointment(): boolean {
    if (this.newAppointment.patientId === 0) {
      this.error = 'Please select a patient';
      return false;
    }
    if (this.newAppointment.doctorId === 0) {
      this.error = 'Please select a doctor';
      return false;
    }
    return true;
  }

  editAppointment(appointment: Appointment) {
    this.isEditing = true;
    this.selectedAppointment = appointment;
    this.newAppointment = { ...appointment };
  }

  resetForm() {
    this.newAppointment = this.initializeNewAppointment();
    this.isEditing = false;
    this.selectedAppointment = null;
    this.error = '';
  }

  deleteAppointment(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this appointment?')) {
      this.loading = true;
      this.apiService.deleteAppointment(id).subscribe({
        next: () => {
          this.loadAppointments();
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error deleting appointment';
          console.error(error);
          this.loading = false;
        }
      });
    }
  }

  getDoctorName(doctorId: number): string {
    const doctor = this.doctors.find(d => d.id === doctorId);
    return doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  }

  getPatientName(patientId: number): string {
    const patient = this.patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  }
}
