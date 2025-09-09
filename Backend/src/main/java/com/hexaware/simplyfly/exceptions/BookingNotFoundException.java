package com.hexaware.simplyfly.exceptions;


public class BookingNotFoundException extends RuntimeException {
    public BookingNotFoundException(String message) {
        super(message);
    }
}
