package com.hexaware.simplyfly.services;

import com.hexaware.simplyfly.dto.SeatDto;
import com.hexaware.simplyfly.entities.Seat;
import java.util.List;

public interface ISeatService {
    Seat addSeat(Seat dto);
    Seat getSeatById(Long id);
    List<Seat> getAllSeats();
    List<Seat> getAvailableSeatsByFlightId(Long flightId);
    Seat updateSeat(Long id, Seat seat);
    String deleteSeat(Long id);
}
