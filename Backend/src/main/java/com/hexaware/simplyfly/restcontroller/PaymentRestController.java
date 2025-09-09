package com.hexaware.simplyfly.restcontroller;

import com.hexaware.simplyfly.dto.PaymentDto;
import com.hexaware.simplyfly.entities.Payment;
import com.hexaware.simplyfly.services.IPaymentService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@Slf4j
@RequestMapping("/api/payments")
public class PaymentRestController {

    @Autowired
    private IPaymentService service;

    public PaymentRestController(IPaymentService service) {
        this.service = service;
    }

    @PostMapping("/pay")
    public PaymentDto pay(@Valid @RequestBody PaymentDto dto) {
        log.info("Processing payment for booking ID: {}", dto.getBookingId());
        return service.pay(dto);
    }

    @GetMapping("/initiate")
    public String initiate(@RequestParam Long bookingId, @RequestParam Double amount) {
        log.info("Initiating payment for booking ID: {} with amount: {}", bookingId, amount);
        return service.initiatePayment(bookingId, amount);
    }

    @GetMapping("/{id}")
    public PaymentDto get(@PathVariable Long id) {
        log.info("Fetching payment with ID: {}", id);
        return service.getPaymentById(id);
    }

    @PostMapping("/refund/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','FLIGHT_OWNER')")
    public void refund(@PathVariable Long id) {
        log.info("Refunding payment with ID: {}", id);
        service.refund(id);
    }
    @GetMapping("/by-booking/{bookingId}")
    public ResponseEntity<Payment> getPaymentByBookingId(@PathVariable Long bookingId) {
        Payment payment = service.getPaymentByBookingId(bookingId);
        return ResponseEntity.ok(payment);
    }

}
