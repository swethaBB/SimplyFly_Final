package com.hexaware.simplyfly.services;

import com.hexaware.simplyfly.dto.RouteDto;
import com.hexaware.simplyfly.entities.Route;
import com.hexaware.simplyfly.exceptions.RouteNotFoundException;
import com.hexaware.simplyfly.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*Author : Swetha  
Modified On : 05-09-2025  
Description : RouteServiceImpl with DTO mapping and admin validation
*/

@Service
public class RouteServiceImpl implements IRouteService {

    @Autowired
    private RouteRepository repo;

    public RouteServiceImpl(RouteRepository repo) {
        this.repo = repo;
    }

    // ✅ Add new route with duplicate check
    @Override
    public RouteDto addRoute(RouteDto dto) {
        Optional<Route> existing = repo.findByOriginAndDestination(dto.getOrigin(), dto.getDestination());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Route already exists between " + dto.getOrigin() + " and " + dto.getDestination());
        }

        Route route = mapToEntity(dto);
        Route saved = repo.save(route);
        return mapToDto(saved);
    }

    // ✅ Get route by ID
    @Override
    public RouteDto getRouteById(Long id) {
        Route route = repo.findById(id)
                .orElseThrow(() -> new RouteNotFoundException("Route with id " + id + " not found"));
        return mapToDto(route);
    }

    // ✅ Get all routes
    @Override
    public List<RouteDto> getAllRoutes() {
        return repo.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // ✅ Update route
    @Override
    public RouteDto updateRoute(Long id, RouteDto dto) {
        Route existing = repo.findById(id)
                .orElseThrow(() -> new RouteNotFoundException("Route with id " + id + " not found"));

        existing.setOrigin(dto.getOrigin());
        existing.setDestination(dto.getDestination());
        existing.setDurationMinutes(dto.getDurationMinutes());
        existing.setDistanceKm(dto.getDistanceKm());


        Route updated = repo.save(existing);
        return mapToDto(updated);
    }

    // ✅ Delete route
    @Override
    public String deleteRoute(Long id) {
        Route route = repo.findById(id)
                .orElseThrow(() -> new RouteNotFoundException("Route with id " + id + " not found"));
        repo.delete(route);
        return "Route deleted successfully";
    }

    // ✅ Get only active routes
    

    // ✅ DTO to Entity
    private Route mapToEntity(RouteDto dto) {
        Route route = new Route();
        route.setId(dto.getId());
        route.setOrigin(dto.getOrigin());
        route.setDestination(dto.getDestination());
        route.setDurationMinutes(dto.getDurationMinutes());
        route.setDistanceKm(dto.getDistanceKm());
        return route;
    }

    // ✅ Entity to DTO
    private RouteDto mapToDto(Route route) {
        return new RouteDto(
                route.getId(),
                route.getOrigin(),
                route.getDestination(),
                route.getDurationMinutes(),
                route.getDistanceKm()
                
        );
    }
}
