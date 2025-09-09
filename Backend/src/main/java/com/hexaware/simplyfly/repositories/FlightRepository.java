package com.hexaware.simplyfly.repositories;

import com.hexaware.simplyfly.entities.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


/*Author : Swetha 
Modified On : 27-07-2025
Description : Flight Repository interface 
*/

public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByRoute_OriginAndRoute_Destination(String origin, String destination);
    
}
