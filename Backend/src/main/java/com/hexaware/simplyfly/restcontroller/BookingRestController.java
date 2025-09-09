package com.hexaware.simplyfly.restcontroller;

import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hexaware.simplyfly.dto.BookingDto;
import com.hexaware.simplyfly.entities.Booking;
import com.hexaware.simplyfly.entities.Payment;
import com.hexaware.simplyfly.entities.Seat;
import com.hexaware.simplyfly.services.IBookingService;
import com.hexaware.simplyfly.services.IPaymentService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@Slf4j
@RequestMapping("/api/bookings")
public class BookingRestController {

    @Autowired
    private IBookingService service;

    @Autowired
    private IPaymentService paymentService;

    @PostMapping("/bookingseat")
    public Map<String, Object> createBooking(Authentication auth, @Valid @RequestBody BookingDto dto) {
        String email = auth.getName();
        dto.setEmail(email);
        Booking booking = service.createBooking(email, dto);
        String paymentUrl = paymentService.initiatePayment(booking.getId(), booking.getTotalPrice());
        log.info("Creating booking for user: {} on flight ID: {}", email, dto.getFlightId());
		/*
		 * return Map.of("booking", convertToDto(booking), "paymentRedirect",
		 * paymentUrl);
		 */
        return Map.of(
        	    "bookingId", booking.getId(),
        	    "paymentRedirect", paymentUrl
        	);

    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable Long id) {
        Booking booking = service.getBookingById(id);
        return ResponseEntity.ok(convertToDto(booking));
    }
    
    @GetMapping("/me")
    public List<BookingDto> myBookings(Authentication auth) {
        String email = auth.getName();
        log.info("Fetching bookings for user: {}", email);
        return service.getBookingsForUser(email).stream()
                .map(this::convertToDto)
                .toList();
    }

    @GetMapping("/flight/{flightId}")
    public List<BookingDto> forFlight(@PathVariable Long flightId) {
        log.info("Fetching bookings for flight ID: {}", flightId);
        return service.getBookingsForFlight(flightId).stream()
                .map(this::convertToDto)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/status/{status}")
    public List<BookingDto> byStatus(@PathVariable String status) {
        log.info("Fetching bookings with status: {}", status);
        return service.getBookingsByStatus(status).stream()
                .map(this::convertToDto)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/flight/{flightId}/status/{status}")
    public List<BookingDto> byFlightAndStatus(@PathVariable Long flightId, @PathVariable String status) {
        log.info("Fetching bookings for flight ID: {} with status: {}", flightId, status);
        return service.getBookingsByFlightAndStatus(flightId, status).stream()
                .map(this::convertToDto)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/daterange")
    public List<BookingDto> byDateRange(@RequestParam String start, @RequestParam String end) {
        log.info("Fetching bookings between {} and {}", start, end);
        return service.getBookingsByDateRange(start, end).stream()
                .map(this::convertToDto)
                .toList();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancel(Authentication auth, @PathVariable Long id) {
        String email = auth.getName();
        log.info("Cancelling booking with ID: {} for user: {}", id, email);
        service.cancelBooking(email, id);
        return ResponseEntity.ok("Booking cancelled successfully");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<BookingDto> getAllBookings() {
        return service.getAllBookings().stream()
            .map(this::convertToDto)
            .toList();
    }

    private BookingDto convertToDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUser().getId());
        dto.setFlightId(booking.getFlight().getId());
        dto.setTotalPrice(booking.getTotalPrice());
        dto.setStatus(booking.getStatus());
        dto.setPassengerName(booking.getPassengerName());
        dto.setEmail(booking.getEmail());
        dto.setSeatNumbers(
            booking.getSeats().stream()
                .map(Seat::getSeatNumber)
                .toList()
        );
        
        Payment payment = paymentService.getPaymentByBookingId(booking.getId());
        if (payment != null) {
            dto.setPaymentId(payment.getId());
        }
        return dto;
    }
}
