package com.hexaware.simplyfly.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;


/*Author : Swetha 
Modified On : 25-07-2025
Description : seat entity class 
*/

@Entity
@Table(name = "seats",
  uniqueConstraints = {@UniqueConstraint(columnNames = {"flight_id","seat_number"})}
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Seat {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "seat_number", nullable = false)
    private String seatNumber;
    private String seatClass; 
    private boolean isBooked = false;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id")
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler", "seats"})
    private Flight flight;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler", "seats"})    
    private Booking booking;
}
