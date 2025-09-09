package com.hexaware.simplyfly.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.*;


/*Author : Swetha
Modified On : 29-07-2025
Description :FlightDto with basic validation
*/


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FlightDto {

    private Long id;

    @NotBlank(message = "Flight name is mandatory")
    private String flightName;

    @NotBlank(message = "Flight number is mandatory")
    @Pattern(regexp = "^[A-Z]{2}[0-9]{3,4}$", 
             message = "Flight number must start with 2 uppercase letters followed by 3-4 digits (e.g., AI123)")
    private String flightNumber;

    @Min(value = 1, message = "Totalseats must be at least 1 minute")
    private Integer totalSeats;

    @Positive(message = "Fare must be positive")
    private Double fare;

    @NotBlank(message = "Baggage info is mandatory")
    private String baggageInfo;

    @NotBlank(message = "Departure time is mandatory")
    private String departureDateTime;

    @NotBlank(message = "Arrival time is mandatory")
    private String arrivalDateTime;
    
    private String status; 

    private Long routeId;
}
