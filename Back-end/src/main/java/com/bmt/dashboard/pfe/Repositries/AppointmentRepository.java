package com.bmt.dashboard.pfe.Repositries;

import com.bmt.dashboard.pfe.Entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate; // Changed from java.util.Date
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByDoctorId(Long doctorId);
    List<Appointment> findByAppointmentDate(LocalDate date); // Updated to LocalDate
    List<Appointment> findByPatientIdAndDoctorId(Long patientId, Long doctorId);
}
