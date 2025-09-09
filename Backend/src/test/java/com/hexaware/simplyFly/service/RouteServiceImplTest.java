package com.hexaware.simplyFly.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.simplyfly.dto.RouteDto;
import com.hexaware.simplyfly.services.RouteServiceImpl;

@SpringBootTest
class RouteServiceImplTest {

    @Autowired
    private RouteServiceImpl routeService;

    @Test
    @Order(1)
    void testAddRoute() {
        RouteDto dto = new RouteDto();
        dto.setOrigin("City A");
        dto.setDestination("City B");
        dto.setDurationMinutes(90);
        dto.setDistanceKm(300.0);


        RouteDto savedRoute = routeService.addRoute(dto);
        assertNotNull(savedRoute);
        assertEquals("City A", savedRoute.getOrigin());
    }

    @Test
    @Order(2)
    void testGetRouteById() {
        RouteDto route = routeService.getRouteById(1L);
        assertNotNull(route);
        assertEquals(1L, route.getId());
    }

    @Test
    @Order(3)
    void testGetAllRoutes() {
        List<RouteDto> routes = routeService.getAllRoutes();
        assertTrue(routes.size() > 0);
    }

    @Test
    @Order(4)
    void testDeleteRouteById() {
        String result = routeService.deleteRoute(1L);
        assertEquals("Route deleted successfully", result);
    }
}
