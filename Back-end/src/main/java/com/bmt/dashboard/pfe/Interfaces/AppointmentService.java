package com.bmt.dashboard.pfe.Interfaces;

import com.bmt.dashboard.pfe.Entities.Appointment;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AppointmentService {
    Optional<Appointment> findById(Long id); // ✅ Retourne un Optional
    List<Appointment> findAll();
    Appointment save(Appointment appointment);
    Appointment update(Long id, Appointment appointment);
    void delete(Long id);
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByAppointmentDate(LocalDate date); // Updated to use LocalDate
}
