package com.hexaware.simplyfly.entities;

import jakarta.persistence.*;
import lombok.*;

/*Author : Swetha 
Modified On : 25-07-2025
Description : Flights entity class 
*/


@Entity
@Table(name = "flights")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Flight {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String flightName;
    private String flightNumber;
    private Integer totalSeats;
    private Double fare;
    private String baggageInfo;
    private String departureDateTime; 
    private String arrivalDateTime;
    @Column(nullable = false)
    private String status = "SCHEDULED";
    @ManyToOne
    @JoinColumn(name = "route_id")
    private Route route;
	
	
}
