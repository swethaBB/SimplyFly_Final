package com.hexaware.simplyfly.repositories;

import com.hexaware.simplyfly.entities.Route;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/*Author : Swetha  
Modified On : 05-09-2025  
Description : Route Repository enhanced for admin filtering and validation
*/

public interface RouteRepository extends JpaRepository<Route, Long> {

    // ✅ For status-based filtering
    
    // ✅ Optional: prevent duplicate origin-destination pairs
    Optional<Route> findByOriginAndDestination(String origin, String destination);
}
