export interface Appointment {
  id?: number;
  patientId: number;
  doctorId: number;
  dateTime: Date;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes: string;
}
