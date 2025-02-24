package com.bmt.dashboard.pfe.Services;

import com.bmt.dashboard.pfe.Entities.Appointment;
import com.bmt.dashboard.pfe.Interfaces.AppointmentService;
import com.bmt.dashboard.pfe.Repositries.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Date;

@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public List<Appointment> findAll() {
        try {
            return appointmentRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching appointments: " + e.getMessage());
        }
    }

    @Override
    public Appointment findById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
    }

    @Override
    public Appointment save(Appointment appointment) {
        try {
            validateAppointment(appointment);
            return appointmentRepository.save(appointment);
        } catch (Exception e) {
            throw new RuntimeException("Error saving appointment: " + e.getMessage());
        }
    }

    @Override
    public Appointment update(Long id, Appointment appointmentDetails) {
        try {
            Appointment appointment = findById(id);
            validateAppointment(appointmentDetails);

            appointment.setPatient(appointmentDetails.getPatient());
            appointment.setDoctor(appointmentDetails.getDoctor());
            appointment.setAppointmentDate(appointmentDetails.getAppointmentDate());
            appointment.setAppointmentTime(appointmentDetails.getAppointmentTime());
            appointment.setStatus(appointmentDetails.getStatus());
            appointment.setDescription(appointmentDetails.getDescription());

            return appointmentRepository.save(appointment);
        } catch (Exception e) {
            throw new RuntimeException("Error updating appointment: " + e.getMessage());
        }
    }

    @Override
    public void delete(Long id) {
        try {
            Appointment appointment = findById(id);
            appointmentRepository.delete(appointment);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting appointment: " + e.getMessage());
        }
    }

    @Override
    public List<Appointment> findByPatientId(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    @Override
    public List<Appointment> findByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Override
    public List<Appointment> findByStatus(String status) {
        return appointmentRepository.findByStatus(status);
    }

    @Override
    public List<Appointment> findByAppointmentDate(Date date) {
        return appointmentRepository.findByAppointmentDate(date);
    }

    private void validateAppointment(Appointment appointment) {
        if (appointment.getPatient() == null) {
            throw new RuntimeException("Patient is required");
        }
        if (appointment.getDoctor() == null) {
            throw new RuntimeException("Doctor is required");
        }
        if (appointment.getAppointmentDate() == null) {
            throw new RuntimeException("Appointment date is required");
        }
        if (appointment.getStatus() == null || appointment.getStatus().trim().isEmpty()) {
            appointment.setStatus("SCHEDULED");
        }
    }
}
