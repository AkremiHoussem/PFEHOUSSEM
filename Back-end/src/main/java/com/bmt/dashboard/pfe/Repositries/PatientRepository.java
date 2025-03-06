package com.bmt.dashboard.pfe.Repositries;

import com.bmt.dashboard.pfe.Entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);
    List<Patient> findByLastNameContainingIgnoreCase(String lastName);
    boolean existsByEmail(String email);
}
