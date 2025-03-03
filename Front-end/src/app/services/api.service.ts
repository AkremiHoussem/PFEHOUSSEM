import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Patient } from '../models/patient';
import { Doctor } from '../models/doctor';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8083/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };


  constructor(private http: HttpClient) {}

  // Patient endpoints
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/patients`).pipe(
        tap(response => console.log('Patients data:', response)),
        catchError(error => this.handleError(error))
    );
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/patients/${id}`).pipe(
        tap(response => console.log('Patient data:', response)),
        catchError(error => this.handleError(error))
    );
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.baseUrl}/patients`, patient, this.httpOptions).pipe(
        tap(response => console.log('Created patient:', response)),
        catchError(error => this.handleError(error))
    );
  }

  // Doctor endpoints
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctors`).pipe(
        tap(response => console.log('Doctors data:', response)),
        catchError(error => this.handleError(error))
    );
  }

  getDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/doctors/${id}`).pipe(
        tap(response => console.log('Doctor data:', response)),
        catchError(error => this.handleError(error))
    );
  }

  createDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.baseUrl}/doctors`, doctor, this.httpOptions).pipe(
        tap(response => console.log('Created doctor:', response)),
        catchError(error => this.handleError(error))
    );
  }

  updateDoctor(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.baseUrl}/doctors/${id}`, doctor, this.httpOptions).pipe(
        tap(response => console.log('Updated doctor:', response)),
        catchError(error => this.handleError(error))
    );
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/doctors/${id}`).pipe(
        tap(() => console.log('Deleted doctor with id:', id)),
        catchError(error => this.handleError(error))
    );
  }

  // Appointment endpoints
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`).pipe(
        tap(response => console.log('Appointments data:', response)),
        catchError(error => this.handleError(error))
    );
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    console.log('Sending appointment:', appointment); // Debugging
    return this.http.post<Appointment>(`${this.baseUrl}/appointments`, appointment, this.httpOptions).pipe(
        tap(response => console.log('Created appointment:', response)),
        catchError(error => this.handleError(error))
    );
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/appointments/${id}`).pipe(
        tap(() => console.log('Deleted appointment with id:', id)),
        catchError(error => this.handleError(error))
    );
  }

  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(
        `${this.baseUrl}/appointments/${id}`,
        appointment,
        this.httpOptions
    ).pipe(
        tap(response => console.log('Updated appointment:', response)),
        catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
      errorMessage = error.error.message;
    } else {
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`);
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
