package com.hexaware.simplyfly.restcontroller;

import com.hexaware.simplyfly.dto.SeatDto;
import com.hexaware.simplyfly.entities.Seat;
import com.hexaware.simplyfly.services.ISeatService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/seats")
public class SeatRestController {

    private final ISeatService service;
    public SeatRestController(ISeatService service) { this.service = service; }

    @PostMapping("/add")
    @PreAuthorize("hasAnyRole('FLIGHT_OWNER','ADMIN')")
    public Seat add(@RequestBody Seat seat) { return service.addSeat(seat); }

	
    @GetMapping("/{id}")
    public SeatDto get(@PathVariable Long id) {
        Seat seat = service.getSeatById(id);
        return convertToDto(seat);
    }
    
    
    @GetMapping("/all")
    public List<SeatDto> all() {
        return service.getAllSeats().stream()
            .map(this::convertToDto)
            .toList();
    }

    private SeatDto convertToDto(Seat seat) {
        SeatDto dto = new SeatDto();
        dto.setId(seat.getId());
        dto.setSeatNumber(seat.getSeatNumber());
        dto.setSeatClass(seat.getSeatClass());
        dto.setBooked(seat.isBooked());
        dto.setFlightId(seat.getFlight() != null ? seat.getFlight().getId() : null);
        dto.setBookingId(seat.getBooking() != null ? seat.getBooking().getId() : null);
        return dto;
    }


    
    @GetMapping("/flight/{flightId}/available")
    public List<SeatDto> available(@PathVariable Long flightId) {
        List<Seat> seats = service.getAvailableSeatsByFlightId(flightId);
        return seats.stream().map(this::convertToDto).toList();
    }


    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('FLIGHT_OWNER','ADMIN')")
    public SeatDto update(@PathVariable Long id, @RequestBody Seat seat) {
        Seat updatedSeat = service.updateSeat(id, seat);
        return convertToDto(updatedSeat);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('FLIGHT_OWNER','ADMIN')")
    public String delete(@PathVariable Long id) {
        return service.deleteSeat(id);
    }
}