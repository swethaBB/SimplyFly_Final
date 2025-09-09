package com.hexaware.simplyfly.dto;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * DTO for Booking entity used in admin and user flows.
 * Author: Swetha
 * Last Modified: 04-09-2025
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingDto {

    private Long id; // Booking ID

    private Long userId; // User who made the booking

    @Positive(message = "Total price must be positive")
    private Double totalPrice;

    @Pattern(regexp = "^(PENDING|CONFIRMED|CANCELLED)$", 
             message = "Status must be PENDING, CONFIRMED, or CANCELLED")
    private String status;

    private Long flightId;

    private String flightName; // ✅ Added for frontend display

    @NotEmpty(message = "Seat numbers list cannot be empty")
    private List<@NotBlank(message = "Seat number must not be blank") String> seatNumbers;

    private String passengerName;

    private String email; // Populated from JWT or entity

    private String contactNo; // ✅ Optional: for admin visibility

    private LocalDateTime bookingDate; // ✅ Added for sorting/filtering
    
    private Long paymentId;

}
