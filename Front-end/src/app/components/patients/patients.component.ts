import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../models/patient';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients.component.html'
})
export class PatientsComponent {
  patients: Patient[] = [];
  newPatient: Patient = {
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    gender: '',
    phoneNumber: '',
    email: '',
    address: ''
  };

  constructor(private apiService: ApiService) {
    this.loadPatients();
  }

  loadPatients() {
    this.apiService.getPatients().subscribe({
      next: (data) => {
        // Flatten the response if appointments are causing issues
        this.patients = data.map((patient: any) => {
          // Extract only patient-related data
          const { id, firstName, lastName, dateOfBirth, gender, email, phoneNumber, address } = patient;
          return { id, firstName, lastName, dateOfBirth, gender, email, phoneNumber, address };
        });
      },
      error: (error) => {
        console.error('Error loading patients:', error);
      }
    });
  }

  onSubmit() {
    this.apiService.createPatient(this.newPatient).subscribe({
      next: (response) => {
        console.log('Patient created successfully:', response);
        this.loadPatients();
        // Reset form
        this.newPatient = {
          firstName: '',
          lastName: '',
          dateOfBirth: new Date(),
          gender: '',
          phoneNumber: '',
          email: '',
          address: ''
        };
      },
      error: (error) => {
        console.error('Error creating patient:', error);
      }
    });
  }
}
