package com.bmt.dashboard.pfe.Entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*@ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;*/

    private Date appointmentDate;
    private String appointmentTime;
    private String status; // e.g., "SCHEDULED", "COMPLETED", "CANCELLED"
    private String description;

    // Getters and Setters
    // Constructor
    // toString method
}
