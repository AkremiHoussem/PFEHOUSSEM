export interface Appointment {
  id?: number; // optional
  patientId: number | null; // nullable
  doctorId: number | null;  // nullable
  appointmentDate: string;  // string or Date (adjust accordingly)
  appointmentTime: string;  // string
  description: string;      // string
}
