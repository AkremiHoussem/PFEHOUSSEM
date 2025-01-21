export interface Appointment {
  id?: number;
  patientId: number;
  doctorId: number;
  dateTime: Date;
  status: string;
  notes: string;
}