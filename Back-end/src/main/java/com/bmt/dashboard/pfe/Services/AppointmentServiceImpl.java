package com.bmt.dashboard.pfe.Services;

import com.bmt.dashboard.pfe.Entities.Appointment;
import com.bmt.dashboard.pfe.Interfaces.AppointmentService;
import com.bmt.dashboard.pfe.Repositries.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
        return appointmentRepository.findAll();
    }

    @Override
    public Optional<Appointment> findById(Long id) {
        return appointmentRepository.findById(id);
    }

    @Override
    public Appointment save(Appointment appointment) {
        validateAppointment(appointment); // Validate patient and doctor
        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment update(Long id, Appointment appointmentDetails) {
        Appointment appointment = findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));

        validateAppointment(appointmentDetails); // Validate patient and doctor

        appointment.setPatient(appointmentDetails.getPatient());
        appointment.setDoctor(appointmentDetails.getDoctor());
        appointment.setAppointmentDate(appointmentDetails.getAppointmentDate());
        appointment.setAppointmentTime(appointmentDetails.getAppointmentTime());
        appointment.setDescription(appointmentDetails.getDescription());

        return appointmentRepository.save(appointment);
    }

    @Override
    public void delete(Long id) {
        Appointment appointment = findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));

        appointmentRepository.delete(appointment);
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
    public List<Appointment> findByAppointmentDate(LocalDate date) {
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
    }
}
