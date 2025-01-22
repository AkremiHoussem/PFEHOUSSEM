package com.bmt.dashboard.pfe.Interfaces;

import com.bmt.dashboard.pfe.Entities.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AppointmentService {

    List<Appointment> findAll();
    Appointment findById(Long id);
    Appointment save(Appointment appointment);
    Appointment update(Long id, Appointment appointment);
    void delete(Long id);
}
