package com.hexaware.simplyfly.restcontroller;

import com.hexaware.simplyfly.dto.FlightDto;
import com.hexaware.simplyfly.entities.Flight;
import com.hexaware.simplyfly.services.IFlightService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@Slf4j
@RequestMapping("/api/flights")
public class FlightRestController {
    
	
	@Autowired
    private IFlightService service;
    public FlightRestController(IFlightService service) { 
    	this.service = service; 
    }

    @PostMapping("/addflight")
    @PreAuthorize("hasAnyRole('FLIGHT_OWNER','ADMIN')")
    public ResponseEntity<Flight> create(@Valid @RequestBody FlightDto dto) {
        log.info("Creating new flight: {}", dto.getFlightName());
        Flight flight = service.createFlight(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(flight);
    }

    @GetMapping("/{id}")
    public Flight get(@PathVariable Long id) {
    	log.info("Fetching flight with ID: {}", id);
    	return service.getFlightById(id); 
    }

    @GetMapping("/all")
    public List<Flight> all() { 
    	log.info("Fetching all flights");
    	return service.getAllFlights();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('FLIGHT_OWNER','ADMIN')")
    public Flight update(@PathVariable Long id, @RequestBody FlightDto dto) { 
    	log.info("Updating flight with ID: {}", id);
    	return service.updateFlight(id, dto); 
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String delete(@PathVariable Long id) { 
    	log.info("Deleting flight with ID: {}", id);
        return service.deleteFlight(id);
        
    }

    @GetMapping("/search")
    public List<Flight> search(@RequestParam String origin, @RequestParam String destination) {
    	log.info("Searching flights from {} to {}", origin, destination);
        return service.searchFlights(origin, destination);
    }
    
	/*
	 * @PatchMapping("/{id}/status")
	 * 
	 * @PreAuthorize("hasRole('ADMIN','FLIGHT_OWNER')") public
	 * ResponseEntity<Flight> updateStatus(@PathVariable Long id, @RequestBody
	 * Map<String, String> body) { String status = body.get("status");
	 * log.info("Updating status of flight {} to {}", id, status); Flight updated =
	 * service.updateFlightStatus(id, status); return ResponseEntity.ok(updated); }
	 */
    
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('FLIGHT_OWNER')")
    public ResponseEntity<Flight> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        log.info("Updating status of flight {} to {}", id, status);

        if (status == null || status.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            Flight updated = service.updateFlightStatus(id, status.trim().toUpperCase());
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            log.error("Failed to update flight status", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
