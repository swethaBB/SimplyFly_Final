package com.hexaware.simplyfly.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;


/*Author : Swetha
Modified On : 29-07-2025
Description : SeatDto with basic validation
*/

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatDto {

    private Long id;

    @NotBlank(message = "Seat number is mandatory")
    @Pattern(regexp = "^[A-Z][0-9]{1,2}$", 
             message = "Seat number must start with an uppercase letter followed by 1-2 digits (e.g., A1, B10)")
    private String seatNumber;

    @NotBlank(message = "Seat class is mandatory")
    @Pattern(regexp = "^(ECONOMY|BUSINESS|FIRST_CLASS)$", 
             message = "Seat class must be ECONOMY, BUSINESS, or FIRST_CLASS")
    private String seatClass;

    private boolean isBooked;

    private Long flightId;
    private Long bookingId;
}
