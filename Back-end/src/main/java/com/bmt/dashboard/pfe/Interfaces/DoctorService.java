package com.bmt.dashboard.pfe.Interfaces;

import com.bmt.dashboard.pfe.Entities.Doctor;

import java.util.List;

public interface DoctorService {
    List<Doctor> findAll();
    Doctor findById(Long id);
    Doctor save(Doctor doctor);
    Doctor update(Long id, Doctor doctor);
    void delete(Long id);
}
