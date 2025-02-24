package com.bmt.dashboard.pfe.Services;

import com.bmt.dashboard.pfe.Entities.Doctor;
import com.bmt.dashboard.pfe.Interfaces.DoctorService;
import com.bmt.dashboard.pfe.Repositries.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public List<Doctor> findAll() {
        try {
            return doctorRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching doctors: " + e.getMessage());
        }
    }

    @Override
    public Doctor findById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
    }

    @Override
    public Doctor save(Doctor doctor) {
        try {
            if (doctor.getEmail() != null && doctorRepository.existsByEmail(doctor.getEmail())) {
                throw new RuntimeException("Email already exists");
            }
            return doctorRepository.save(doctor);
        } catch (Exception e) {
            throw new RuntimeException("Error saving doctor: " + e.getMessage());
        }
    }

    @Override
    public Doctor update(Long id, Doctor doctorDetails) {
        try {
            Doctor doctor = doctorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));

            // Check email uniqueness only if it's changed
            if (!doctor.getEmail().equals(doctorDetails.getEmail()) &&
                    doctorRepository.existsByEmail(doctorDetails.getEmail())) {
                throw new RuntimeException("Email already exists");
            }

            doctor.setFirstName(doctorDetails.getFirstName());
            doctor.setLastName(doctorDetails.getLastName());
            doctor.setEmail(doctorDetails.getEmail());
            doctor.setPhone(doctorDetails.getPhone());
            doctor.setSpecialization(doctorDetails.getSpecialization());
            doctor.setQualification(doctorDetails.getQualification());
            doctor.setExperience(doctorDetails.getExperience());

            return doctorRepository.save(doctor);
        } catch (Exception e) {
            throw new RuntimeException("Error updating doctor: " + e.getMessage());
        }
    }

    @Override
    public void delete(Long id) {
        try {
            Doctor doctor = doctorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
            doctorRepository.delete(doctor);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting doctor: " + e.getMessage());
        }
    }
}
