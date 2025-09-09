package com.hexaware.simplyfly.restcontroller;

import com.hexaware.simplyfly.dto.RouteDto;
import com.hexaware.simplyfly.services.IRouteService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@Slf4j
@RequestMapping("/api/routes")
public class RouteRestController {

    @Autowired
    private IRouteService service;

    public RouteRestController(IRouteService service) {
        this.service = service;
    }

    // ✅ Add new route
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public RouteDto addRoute(@RequestBody RouteDto routeDto) {
        log.info("Adding new route from {} to {}", routeDto.getOrigin(), routeDto.getDestination());
        return service.addRoute(routeDto);
    }

    // ✅ Get route by ID
    @GetMapping("/{id}")
    public RouteDto getRoute(@PathVariable Long id) {
        log.info("Fetching route with ID: {}", id);
        return service.getRouteById(id);
    }

    // ✅ Get all routes
    @GetMapping("/all")
    public List<RouteDto> getAll() {
        log.info("Fetching all routes");
        return service.getAllRoutes();
    }

    // ✅ Update route
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public RouteDto update(@PathVariable Long id, @RequestBody RouteDto routeDto) {
        log.info("Updating route with ID: {}", id);
        return service.updateRoute(id, routeDto);
    }

    // ✅ Delete route
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String delete(@PathVariable Long id) {
        log.info("Deleting route with ID: {}", id);
        return service.deleteRoute(id);
    }

    
}
