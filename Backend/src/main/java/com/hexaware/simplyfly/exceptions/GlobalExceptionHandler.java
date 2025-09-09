package com.hexaware.simplyfly.exceptions;

import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import java.time.LocalDateTime;
import java.util.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<Object> build(HttpStatus status, String error, Object msg, WebRequest req) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", error);
        body.put("message", msg);
        body.put("path", req.getDescription(false).replace("uri=", ""));
        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(UserInfoNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFound(UserInfoNotFoundException ex, WebRequest req) {
        return build(HttpStatus.NOT_FOUND, "User Not Found", ex.getMessage(), req);
    }

    @ExceptionHandler(BookingNotFoundException.class)
    public ResponseEntity<Object> handleBookingNotFound(BookingNotFoundException ex, WebRequest req) {
        return build(HttpStatus.NOT_FOUND, "Booking Not Found", ex.getMessage(), req);
    }

    @ExceptionHandler(RouteNotFoundException.class)
    public ResponseEntity<Object> handleRouteNotFound(RouteNotFoundException ex, WebRequest req) {
        return build(HttpStatus.NOT_FOUND, "Route Not Found", ex.getMessage(), req);
    }

    @ExceptionHandler(PaymentNotFoundException.class)
    public ResponseEntity<Object> handlePaymentNotFound(PaymentNotFoundException ex, WebRequest req) {
        return build(HttpStatus.NOT_FOUND, "Payment Not Found", ex.getMessage(), req);
    }

    @ExceptionHandler(SeatNotFoundException.class)
    public ResponseEntity<Object> handleSeatNotFound(SeatNotFoundException ex, WebRequest req) {
        return build(HttpStatus.NOT_FOUND, "Seat Not Found", ex.getMessage(), req);
    }

    @ExceptionHandler(FlightNotFoundException.class)
    public ResponseEntity<Object> handleFlightNotFound(FlightNotFoundException ex, WebRequest req) {
        return build(HttpStatus.NOT_FOUND, "Flight Not Found", ex.getMessage(), req);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<Object> handleDuplicateResource(DuplicateResourceException ex, WebRequest req) {
        return build(HttpStatus.CONFLICT, "Duplicate Resource", ex.getMessage(), req);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Object> handleBadRequest(BadRequestException ex, WebRequest req) {
        return build(HttpStatus.BAD_REQUEST, "Bad Request", ex.getMessage(), req);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidation(MethodArgumentNotValidException ex, WebRequest req) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(fe -> errors.put(fe.getField(), fe.getDefaultMessage()));
        return build(HttpStatus.BAD_REQUEST, "Validation Failed", errors, req);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAll(Exception ex, WebRequest req) {
        return build(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", ex.getMessage(), req);
    }
}
