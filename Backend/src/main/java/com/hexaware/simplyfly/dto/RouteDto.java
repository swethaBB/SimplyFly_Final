package com.hexaware.simplyfly.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

/*Author : Swetha  
Modified On : 05-09-2025  
Description : RouteDto with status for admin control
*/

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RouteDto {

    private Long id;

    @NotBlank(message = "Origin is mandatory")
    private String origin;

    @NotBlank(message = "Destination is mandatory")
    private String destination;

    @Positive(message = "Duration must be positive")
    private Integer durationMinutes;

    @Positive(message = "Distance must be positive")
    private Double distanceKm;

}
