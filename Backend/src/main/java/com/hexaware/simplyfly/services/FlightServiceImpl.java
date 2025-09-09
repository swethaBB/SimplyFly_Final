package com.hexaware.simplyfly.services;

import com.hexaware.simplyfly.dto.FlightDto;
import com.hexaware.simplyfly.entities.Flight;
import com.hexaware.simplyfly.entities.Route;
import com.hexaware.simplyfly.exceptions.FlightNotFoundException;
import com.hexaware.simplyfly.exceptions.RouteNotFoundException;
import com.hexaware.simplyfly.repositories.FlightRepository;
import com.hexaware.simplyfly.repositories.RouteRepository;
import com.hexaware.simplyfly.services.IFlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FlightServiceImpl implements IFlightService {
    @Autowired
    private FlightRepository flightRepo;
    @Autowired
    private RouteRepository routeRepo;

    public FlightServiceImpl(FlightRepository flightRepo, RouteRepository routeRepo) {
        this.flightRepo = flightRepo;
        this.routeRepo = routeRepo;
    }

    @Override
    @Transactional
    public Flight createFlight(FlightDto dto) {
        Route r = routeRepo.findById(dto.getRouteId()).orElseThrow(() -> new RouteNotFoundException("Route not found"));
        Flight f = new Flight();
        f.setFlightName(dto.getFlightName());
        f.setFlightNumber(dto.getFlightNumber());
        f.setTotalSeats(dto.getTotalSeats());
        f.setFare(dto.getFare());
        f.setBaggageInfo(dto.getBaggageInfo());
        f.setDepartureDateTime(dto.getDepartureDateTime());
        f.setArrivalDateTime(dto.getArrivalDateTime());
        f.setRoute(r);
        return flightRepo.save(f);
    }

    @Override
    public Flight getFlightById(Long id) {
        return flightRepo.findById(id).orElseThrow(() -> new FlightNotFoundException("Flight with id " + id + " not found"));
    }
    


    @Override
    public List<Flight> getAllFlights() { return flightRepo.findAll(); }

    @Override
    @Transactional
    public Flight updateFlight(Long id, FlightDto dto) {
        Flight existing = getFlightById(id);
        if (dto.getFlightName() != null) existing.setFlightName(dto.getFlightName());
        if (dto.getFlightNumber() != null) existing.setFlightNumber(dto.getFlightNumber());
        if (dto.getTotalSeats() != null) existing.setTotalSeats(dto.getTotalSeats());
        if (dto.getFare() != null) existing.setFare(dto.getFare());
        if (dto.getBaggageInfo() != null) existing.setBaggageInfo(dto.getBaggageInfo());
        if (dto.getDepartureDateTime() != null) existing.setDepartureDateTime(dto.getDepartureDateTime());
        if (dto.getArrivalDateTime() != null) existing.setArrivalDateTime(dto.getArrivalDateTime());
        if (dto.getRouteId() != null) {
            Route r = routeRepo.findById(dto.getRouteId()).orElseThrow(() -> new RouteNotFoundException("Route not found"));
            existing.setRoute(r);
        }
        return flightRepo.save(existing);
    }
    


    @Override
    public String deleteFlight(Long id) {
        Flight f = getFlightById(id);
        flightRepo.delete(f);
        return "Flight deleted successfully";
    }

    @Override
    public List<Flight> searchFlights(String origin, String destination) {
        return flightRepo.findByRoute_OriginAndRoute_Destination(origin, destination);
    }
    
    @Override
    @Transactional
    public Flight updateFlightStatus(Long id, String status) {
        Flight flight = getFlightById(id);
        flight.setStatus(status);
        return flightRepo.save(flight);
    }

}
