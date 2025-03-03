import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../models/patient';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Correction ici
  templateUrl: './patients.component.html'
})
export class PatientsComponent {
  patients: Patient[] = [];
  newPatient: Patient = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: ''
  };

  constructor(private apiService: ApiService) {
    this.loadPatients();
  }

  loadPatients() {
    this.apiService.getPatients().subscribe({
      next: (data: any[]) => {
        this.patients = data.map((patient: any) => ({
          id: patient.id,
          firstName: patient.firstName,
          lastName: patient.lastName,
          dateOfBirth: patient.dateOfBirth,
          gender: patient.gender,
          email: patient.email,
          phone: patient.phone,
          address: patient.address
        }));
      },
      error: (error) => {
        console.error('Error loading patients:', error);
      }
    });
  }

  onSubmit() {
    const formattedPatient: Patient = {
      ...this.newPatient,
      dateOfBirth: this.formatDate(this.newPatient.dateOfBirth)
    };

    this.apiService.createPatient(formattedPatient).subscribe({
      next: (response) => {
        console.log('Patient created successfully:', response);
        this.loadPatients();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating patient:', error);
      }
    });
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  resetForm() {
    this.newPatient = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      phone: '',
      email: '',
      address: ''
    };
  }
}
