package com.hexaware.simplyfly.services;

import com.hexaware.simplyfly.entities.Flight;
import com.hexaware.simplyfly.dto.FlightDto;
import java.util.List;

public interface IFlightService {
    Flight createFlight(FlightDto dto);
    Flight getFlightById(Long id);
    List<Flight> getAllFlights();
    Flight updateFlight(Long id, FlightDto dto);
    String deleteFlight(Long id);
    List<Flight> searchFlights(String origin, String destination);
    Flight updateFlightStatus(Long id, String status);

	
}
