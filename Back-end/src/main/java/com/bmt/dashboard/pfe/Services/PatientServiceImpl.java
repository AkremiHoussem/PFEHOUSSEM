package com.bmt.dashboard.pfe.Services;

import com.bmt.dashboard.pfe.Entities.Patient;
import com.bmt.dashboard.pfe.Interfaces.PatientService;
import com.bmt.dashboard.pfe.Repositries.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public List<Patient> getAllPatients() {
        try {
            return patientRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching patients: " + e.getMessage());
        }
    }

    @Override
    public Optional<Patient> getPatientById(Long id) {
        try {
            return patientRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching patient: " + e.getMessage());
        }
    }

    @Override
    public Optional<Patient> getPatientByEmail(String email) {
        try {
            return patientRepository.findByEmail(email);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching patient by email: " + e.getMessage());
        }
    }

    @Override
    public Patient createPatient(Patient patient) {
        try {
            if (patientRepository.existsByEmail(patient.getEmail())) {
                throw new RuntimeException("Email already exists");
            }
            return patientRepository.save(patient);
        } catch (Exception e) {
            throw new RuntimeException("Error creating patient: " + e.getMessage());
        }
    }

    @Override
    public Patient updatePatient(Long id, Patient patientDetails) {
        try {
            Patient patient = patientRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

            // Check email uniqueness only if it's changed
            if (!patient.getEmail().equals(patientDetails.getEmail()) &&
                    patientRepository.existsByEmail(patientDetails.getEmail())) {
                throw new RuntimeException("Email already exists");
            }

            patient.setFirstName(patientDetails.getFirstName());
            patient.setLastName(patientDetails.getLastName());
            patient.setEmail(patientDetails.getEmail());
            patient.setPhone(patientDetails.getPhone());
            patient.setAddress(patientDetails.getAddress());
            patient.setDateOfBirth(patientDetails.getDateOfBirth());
            patient.setGender(patientDetails.getGender());

            return patientRepository.save(patient);
        } catch (Exception e) {
            throw new RuntimeException("Error updating patient: " + e.getMessage());
        }
    }

    @Override
    public void deletePatient(Long id) {
        try {
            Patient patient = patientRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
            patientRepository.delete(patient);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting patient: " + e.getMessage());
        }
    }

    @Override
    public List<Patient> searchPatientsByLastName(String lastName) {
        try {
            return patientRepository.findByLastNameContainingIgnoreCase(lastName);
        } catch (Exception e) {
            throw new RuntimeException("Error searching patients: " + e.getMessage());
        }
    }
}
