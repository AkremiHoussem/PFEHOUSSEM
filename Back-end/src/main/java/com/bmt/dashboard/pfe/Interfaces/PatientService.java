package com.bmt.dashboard.pfe.Interfaces;

import com.bmt.dashboard.pfe.Entities.Patient;

import java.util.List;

public interface PatientService {
    List<Patient> findAll();
    Patient findById(Long id);
    Patient save(Patient patient);
    Patient update(Long id, Patient patient);
    void delete(Long id);
}
