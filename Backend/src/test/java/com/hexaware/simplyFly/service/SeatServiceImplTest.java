package com.hexaware.simplyFly.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.simplyfly.entities.Seat;
import com.hexaware.simplyfly.services.SeatServiceImpl;

@SpringBootTest
class SeatServiceImplTest {

    @Autowired
    private SeatServiceImpl seatService;

    @Test
    @Order(1)
    void testAddSeat() {
        Seat seat = new Seat();
        seat.setSeatNumber("A1");
        Seat savedSeat = seatService.addSeat(seat);
        assertNotNull(savedSeat);
        assertEquals("A1", savedSeat.getSeatNumber());
    }

    @Test
    @Order(2)
    void testGetSeatById() {
        Seat seat = seatService.getSeatById(1L);
        assertNotNull(seat);
        assertEquals(1L, seat.getId());
    }

    @Test
    @Order(3)
    void testGetAllSeats() {
        List<Seat> seats = seatService.getAllSeats();
        assertTrue(seats.size() > 0);
    }

    @Test
    @Order(4)
    void testDeleteSeatById() {
        String result = seatService.deleteSeat(1L);
        assertEquals("Record deleted successfully", result);
    }
}
