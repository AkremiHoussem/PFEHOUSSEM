package com.bmt.dashboard.pfe.Interfaces;

import com.bmt.dashboard.pfe.Entities.Patient;
import java.util.List;
import java.util.Optional;

public interface PatientService {
    List<Patient> findAll();
    Optional<Patient> findById(Long id);
    Patient save(Patient patient);
    Patient update(Long id, Patient patient);
    void delete(Long id);
}
