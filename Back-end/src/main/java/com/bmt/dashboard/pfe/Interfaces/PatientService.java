package com.bmt.dashboard.pfe.Interfaces;

import com.bmt.dashboard.pfe.Entities.Patient;
import java.util.List;
import java.util.Optional;

public interface PatientService {
    List<Patient> getAllPatients();
    Optional<Patient> getPatientById(Long id);
    Optional<Patient> getPatientByEmail(String email);
    Patient createPatient(Patient patient);
    Patient updatePatient(Long id, Patient patient);
    void deletePatient(Long id);
    List<Patient> searchPatientsByLastName(String lastName);
}
