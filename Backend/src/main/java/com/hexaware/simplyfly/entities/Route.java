package com.hexaware.simplyfly.entities;

import jakarta.persistence.*;
import lombok.*;

/*Author : Swetha  
Modified On : 05-09-2025  
Description : Route entity with status for admin control
*/

@Entity
@Table(name = "routes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String origin;

    private String destination;

    private Integer durationMinutes;

    private Double distanceKm;

    
}
