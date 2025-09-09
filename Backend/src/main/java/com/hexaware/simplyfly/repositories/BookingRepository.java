package com.hexaware.simplyfly.repositories;

import com.hexaware.simplyfly.entities.Booking;
import com.hexaware.simplyfly.entities.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Author: Swetha  
 * Last Modified: 04-09-2025  
 * Description: Booking Repository enhanced for admin filtering and analytics
 */

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUser(UserInfo user);

    List<Booking> findByFlight_Id(Long flightId);

    List<Booking> findByEmail(String email);

    // ✅ For admin filtering
    List<Booking> findByStatus(String status);

    // ✅ For flight-specific status filtering
    List<Booking> findByFlight_IdAndStatus(Long flightId, String status);

    // ✅ Optional: for dashboard analytics
    List<Booking> findByBookingDateBetween(LocalDateTime start, LocalDateTime end);
}
