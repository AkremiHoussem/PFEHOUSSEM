package com.bmt.dashboard.pfe.Repositries;

import com.bmt.dashboard.pfe.Entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByEmail(String email);
    List<Doctor> findByLastNameContainingIgnoreCase(String lastName);
    boolean existsByEmail(String email);
}
