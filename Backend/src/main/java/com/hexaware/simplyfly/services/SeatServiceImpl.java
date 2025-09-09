package com.hexaware.simplyfly.services;

import com.hexaware.simplyfly.entities.Flight;
import com.hexaware.simplyfly.entities.Seat;
import com.hexaware.simplyfly.exceptions.*;
import com.hexaware.simplyfly.repositories.FlightRepository;
import com.hexaware.simplyfly.repositories.SeatRepository;
import com.hexaware.simplyfly.services.ISeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServiceImpl implements ISeatService {
	

    private final SeatRepository seatRepo;
    private final FlightRepository flightRepo;

    public SeatServiceImpl(SeatRepository seatRepo, FlightRepository flightRepo) {
        this.seatRepo = seatRepo;
        this.flightRepo = flightRepo;
    }

    @Override
    public Seat addSeat(Seat seat) {
        if (seat.getFlight() == null || seat.getFlight().getId() == null) {
            throw new BadRequestException("Flight id is required for seat");
        }
        Flight f = flightRepo.findById(seat.getFlight().getId()).orElseThrow(() -> new FlightNotFoundException("Flight not found"));
        seat.setFlight(f);
        return seatRepo.save(seat);
    }

    @Override
    public Seat getSeatById(Long id) {
        return seatRepo.findById(id).orElseThrow(() -> new SeatNotFoundException("Seat with id " + id + " not found"));
    }

    @Override
    public List<Seat> getAllSeats() { return seatRepo.findAll(); }

    @Override
    public List<Seat> getAvailableSeatsByFlightId(Long flightId) {
        Flight f = flightRepo.findById(flightId).orElseThrow(() -> new FlightNotFoundException("Flight not found"));
        return seatRepo.findByFlightAndIsBookedFalse(f);
    }

    @Override
    public Seat updateSeat(Long id, Seat seat) {
        Seat e = getSeatById(id);
        if (seat.getSeatNumber() != null) e.setSeatNumber(seat.getSeatNumber());
        if (seat.getSeatClass() != null) e.setSeatClass(seat.getSeatClass());
        e.setBooked(seat.isBooked());
        return seatRepo.save(e);
    }

    @Override
    public String deleteSeat(Long id) {
        Seat e = getSeatById(id);
        seatRepo.delete(e);
        return "Seat deleted successfully";
    }
}
