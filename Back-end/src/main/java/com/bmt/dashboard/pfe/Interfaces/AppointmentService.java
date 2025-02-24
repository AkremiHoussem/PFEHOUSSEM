package com.bmt.dashboard.pfe.Interfaces;

import com.bmt.dashboard.pfe.Entities.Appointment;
import java.util.List;
import java.util.Date;

public interface AppointmentService {
    List<Appointment> findAll();
    Appointment findById(Long id);
    Appointment save(Appointment appointment);
    Appointment update(Long id, Appointment appointment);
    void delete(Long id);
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByDoctorId(Long doctorId);
    List<Appointment> findByStatus(String status);
    List<Appointment> findByAppointmentDate(Date date);
}
