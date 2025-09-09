package com.hexaware.simplyfly.repositories;

import com.hexaware.simplyfly.entities.Seat;

import jakarta.validation.constraints.NotBlank;

import com.hexaware.simplyfly.entities.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

/*Author : Swetha 
Modified On : 27-07-2025
Description : Seat Repository interface 
*/


public interface SeatRepository extends JpaRepository<Seat, Long> {
	
	  List<Seat> findByFlightAndIsBookedFalse(Flight flight); 
	  List<Seat> findByFlightAndSeatNumber(Flight flight, String seatNumber); 
	  List<Seat> findByFlightIdAndSeatNumberIn(Long flightId, List<String> seatNumbers);
	  List<Seat> findByFlight(Flight f);
	
	
}
