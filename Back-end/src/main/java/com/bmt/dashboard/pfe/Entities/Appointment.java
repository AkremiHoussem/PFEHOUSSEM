package com.bmt.dashboard.pfe.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appointments")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Évite les erreurs de Lazy Loading
@JsonInclude(JsonInclude.Include.NON_NULL) // Ignore les champs null lors de la sérialisation JSON
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name = "appointment_date", nullable = false)
    @NotNull(message = "Appointment date cannot be null")
    @FutureOrPresent(message = "Appointment date must be in the present or future")
    private LocalDate appointmentDate;

    @Column(name = "appointment_time", nullable = false)
    @NotNull(message = "Appointment time cannot be null")
    private LocalTime appointmentTime;

    @Column(length = 500)
    private String description;
}
