package com.hexaware.simplyfly.services;

import com.hexaware.simplyfly.dto.RouteDto;
import com.hexaware.simplyfly.entities.Route;

import java.util.List;

public interface IRouteService {

    // ✅ Create a new route
    RouteDto addRoute(RouteDto routeDto);

    // ✅ Get route by ID
    RouteDto getRouteById(Long id);

    // ✅ Get all routes (optionally filtered by status)
    List<RouteDto> getAllRoutes();

    // ✅ Update route details
    RouteDto updateRoute(Long id, RouteDto routeDto);

    // ✅ Delete route (with flight dependency check)
    String deleteRoute(Long id);

    
}
