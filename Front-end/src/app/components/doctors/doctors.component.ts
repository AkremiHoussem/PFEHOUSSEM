import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Doctor } from '../../models/doctor';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  newDoctor: Doctor = this.initializeNewDoctor();
  isEditing = false;
  selectedDoctor: Doctor | null = null;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  private initializeNewDoctor(): Doctor {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialization: '',
      qualification: '',
      experience: 0
    };
  }

  loadDoctors() {
    this.apiService.getDoctors().subscribe({
      next: (data) => {
        console.log('Loaded doctors:', data);
        this.doctors = data;
      },
      error: (error) => {
        this.error = 'Error loading doctors: ' + error.message;
        console.error('Error loading doctors:', error);
      }
    });
  }

  onSubmit() {
    console.log('Submitting doctor:', this.newDoctor);

    if (this.isEditing && this.selectedDoctor?.id) {
      this.apiService.updateDoctor(this.selectedDoctor.id, this.newDoctor).subscribe({
        next: (updatedDoctor) => {
          console.log('Doctor updated:', updatedDoctor);
          this.loadDoctors();
          this.resetForm();
        },
        error: (error) => {
          this.error = 'Error updating doctor: ' + error.message;
          console.error('Error updating doctor:', error);
        }
      });
    } else {
      this.apiService.createDoctor(this.newDoctor).subscribe({
        next: (createdDoctor) => {
          console.log('Doctor created:', createdDoctor);
          this.loadDoctors();
          this.resetForm();
        },
        error: (error) => {
          this.error = 'Error creating doctor: ' + error.message;
          console.error('Error creating doctor:', error);
        }
      });
    }
  }

  editDoctor(doctor: Doctor) {
    this.isEditing = true;
    this.selectedDoctor = doctor;
    this.newDoctor = { ...doctor };
  }

  deleteDoctor(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this doctor?')) {
      this.apiService.deleteDoctor(id).subscribe({
        next: () => {
          console.log('Doctor deleted successfully');
          this.loadDoctors();
        },
        error: (error) => {
          this.error = 'Error deleting doctor: ' + error.message;
          console.error('Error deleting doctor:', error);
        }
      });
    }
  }

  resetForm() {
    this.newDoctor = this.initializeNewDoctor();
    this.isEditing = false;
    this.selectedDoctor = null;
    this.error = '';
  }
}
