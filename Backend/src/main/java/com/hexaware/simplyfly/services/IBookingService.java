package com.hexaware.simplyfly.services;

import com.hexaware.simplyfly.dto.BookingDto;
import com.hexaware.simplyfly.entities.Booking;

import java.time.LocalDateTime;
import java.util.List;

public interface IBookingService {

    Booking createBooking(String email, BookingDto dto);

    Booking getBookingById(Long id);

    List<Booking> getBookingsForUser(String email);

    List<Booking> getBookingsForFlight(Long flightId);

    void cancelBooking(String email, Long bookingId);

    List<Booking> getAllBookings();

    // ✅ New methods for admin filtering and analytics
    List<Booking> getBookingsByStatus(String status);

    List<Booking> getBookingsByFlightAndStatus(Long flightId, String status);

    List<Booking> getBookingsByDateRange(String start, String end);
}
