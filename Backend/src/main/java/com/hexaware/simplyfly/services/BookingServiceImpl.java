package com.hexaware.simplyfly.services;

import com.hexaware.simplyfly.dto.BookingDto;
import com.hexaware.simplyfly.entities.*;
import com.hexaware.simplyfly.exceptions.*;
import com.hexaware.simplyfly.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements IBookingService {

    private final BookingRepository bookingRepo;
    private final FlightRepository flightRepo;
    private final UserInfoRepository userRepo;
    private final SeatRepository seatRepo;
    private final PaymentRepository paymentRepo;

    public BookingServiceImpl(BookingRepository bookingRepo,
                              FlightRepository flightRepo,
                              UserInfoRepository userRepo,
                              SeatRepository seatRepo,
                              PaymentRepository paymentRepo) {
        this.bookingRepo = bookingRepo;
        this.flightRepo = flightRepo;
        this.userRepo = userRepo;
        this.seatRepo = seatRepo;
        this.paymentRepo = paymentRepo;
    }

    @Override
    @Transactional
    public Booking createBooking(String email, BookingDto dto) {
        UserInfo user = userRepo.findByEmail(email)
            .orElseThrow(() -> new UserInfoNotFoundException("User not found"));

        Flight flight = flightRepo.findById(dto.getFlightId())
            .orElseThrow(() -> new FlightNotFoundException("Flight not found"));

        if (dto.getSeatNumbers() == null || dto.getSeatNumbers().isEmpty()) {
            throw new BadRequestException("Select at least one seat");
        }

        List<Seat> seats = seatRepo.findByFlightIdAndSeatNumberIn(dto.getFlightId(), dto.getSeatNumbers());

        if (seats.isEmpty()) {
            throw new SeatNotFoundException("No seats found for booking");
        }

        for (Seat seat : seats) {
            if (seat.isBooked()) {
                throw new BadRequestException("Seat " + seat.getSeatNumber() + " is already booked");
            }
            seat.setBooked(true);
        }

        Booking booking = new Booking();
        booking.setBookingDate(LocalDateTime.now());
        booking.setUser(user);
        booking.setFlight(flight);
        booking.setSeats(new HashSet<>(seats));
        booking.setTotalPrice(dto.getTotalPrice());
        booking.setStatus("PENDING");
        booking.setEmail(dto.getEmail());
        booking.setPassengerName(dto.getPassengerName());

        for (Seat seat : seats) {
            seat.setBooking(booking);
        }

        Booking saved = bookingRepo.save(booking);
        seatRepo.saveAll(seats);

        return saved;
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepo.findById(id)
            .orElseThrow(() -> new BookingNotFoundException("Booking not found"));
    }

    @Override
    public List<Booking> getBookingsForUser(String email) {
        UserInfo user = userRepo.findByEmail(email)
            .orElseThrow(() -> new UserInfoNotFoundException("User not found"));
        return bookingRepo.findByUser(user);
    }

    @Override
    public List<Booking> getBookingsForFlight(Long flightId) {
        return bookingRepo.findByFlight_Id(flightId);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    @Override
    public List<Booking> getBookingsByStatus(String status) {
        return bookingRepo.findByStatus(status.toUpperCase());
    }

    @Override
    public List<Booking> getBookingsByFlightAndStatus(Long flightId, String status) {
        return bookingRepo.findByFlight_IdAndStatus(flightId, status.toUpperCase());
    }

    @Override
    public List<Booking> getBookingsByDateRange(String start, String end) {
        try {
            LocalDateTime startDate = LocalDateTime.parse(start);
            LocalDateTime endDate = LocalDateTime.parse(end);
            return bookingRepo.findByBookingDateBetween(startDate, endDate);
        } catch (DateTimeParseException e) {
            throw new BadRequestException("Invalid date format. Use ISO format: yyyy-MM-ddTHH:mm:ss");
        }
    }

    @Override
    @Transactional
    public void cancelBooking(String email, Long bookingId) {
        UserInfo user = userRepo.findByEmail(email)
            .orElseThrow(() -> new UserInfoNotFoundException("User not found"));

        Booking b = bookingRepo.findById(bookingId)
            .orElseThrow(() -> new BookingNotFoundException("Booking not found"));

        if (!b.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Not authorized to cancel this booking");
        }

        if ("CANCELLED".equalsIgnoreCase(b.getStatus())) {
            throw new BadRequestException("Booking already cancelled");
        }

        for (Seat s : b.getSeats()) {
            s.setBooked(false);
            s.setBooking(null);
        }

        seatRepo.saveAll(new ArrayList<>(b.getSeats()));
        b.setStatus("CANCELLED");
        bookingRepo.save(b);

        paymentRepo.findAll().stream()
            .filter(p -> p.getBooking() != null && p.getBooking().getId().equals(b.getId()))
            .findFirst()
            .ifPresent(p -> {
                if ("SUCCESS".equalsIgnoreCase(p.getStatus())) {
                    p.setStatus("REFUNDED");
                    paymentRepo.save(p);
                    System.out.println("Refund processed for booking " + b.getId());
                }
            });
    }
}
