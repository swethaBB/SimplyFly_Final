package com.hexaware.simplyfly.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Author: Swetha  
 * Last Modified: 04-09-2025  
 * Description: Booking entity enhanced for admin management and frontend display
 */

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime bookingDate;

    private Double totalPrice;

    private String status = "PENDING";

    @Column(nullable = false)
    private String email;

    @Column(name = "passenger_name")
    private String passengerName;

    @Column(name = "contact_no")
    private String contactNo; // ✅ Added for admin visibility

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserInfo user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id")
    private Flight flight;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Seat> seats = new HashSet<>();

    @PrePersist
    public void onCreate() {
        this.bookingDate = LocalDateTime.now();
    }
    @OneToOne(mappedBy = "booking")
    private Payment payment;

}
