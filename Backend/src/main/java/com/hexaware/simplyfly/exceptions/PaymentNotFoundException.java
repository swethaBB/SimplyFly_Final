package com.hexaware.simplyfly.exceptions;

public class PaymentNotFoundException extends RuntimeException {
    public PaymentNotFoundException (String message) {
        super(message);
    }
}
