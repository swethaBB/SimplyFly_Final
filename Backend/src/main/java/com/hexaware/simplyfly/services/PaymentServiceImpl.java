package com.hexaware.simplyfly.services;

import com.hexaware.simplyfly.dto.PaymentDto;
import com.hexaware.simplyfly.entities.Booking;
import com.hexaware.simplyfly.entities.Payment;
import com.hexaware.simplyfly.exceptions.BadRequestException;
import com.hexaware.simplyfly.exceptions.BookingNotFoundException;
import com.hexaware.simplyfly.exceptions.PaymentNotFoundException;
import com.hexaware.simplyfly.repositories.BookingRepository;
import com.hexaware.simplyfly.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentServiceImpl implements IPaymentService {

    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private BookingRepository bookingRepo;

    @Override
    @Transactional
    public PaymentDto pay(PaymentDto dto) {
        Booking booking = bookingRepo.findById(dto.getBookingId())
            .orElseThrow(() -> new BookingNotFoundException("Booking not found"));

        if (!"PENDING".equalsIgnoreCase(booking.getStatus())) {
            throw new BadRequestException("Payment can only be made for pending bookings");
        }

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(dto.getAmount());
        payment.setMethod(dto.getMethod());
        payment.setStatus("SUCCESS");

        Payment saved = paymentRepo.save(payment);
        booking.setStatus("CONFIRMED");
        bookingRepo.save(booking);

        return mapToDto(saved);
    }

    @Override
    public PaymentDto getPaymentById(Long id) {
        Payment payment = paymentRepo.findById(id)
            .orElseThrow(() -> new PaymentNotFoundException("Payment not found"));
        return mapToDto(payment);
    }

    @Override
    public void refund(Long paymentId) {
        Payment payment = paymentRepo.findById(paymentId)
            .orElseThrow(() -> new PaymentNotFoundException("Payment not found"));
        payment.setStatus("REFUNDED");
        paymentRepo.save(payment);
    }
    
    @Override
    public Payment getPaymentByBookingId(Long bookingId) {
        return paymentRepo.findByBookingId(bookingId).orElse(null);
    }

    @Override
    public String initiatePayment(Long bookingId, Double amount) {
        Booking booking = bookingRepo.findById(bookingId)
            .orElseThrow(() -> new BookingNotFoundException("Booking not found"));

        if (!"PENDING".equalsIgnoreCase(booking.getStatus())) {
            throw new BadRequestException("Payment can only be initiated for pending bookings");
        }

        return "https://mockpayment.com/pay?bookingId=" + bookingId + "&amount=" + amount;
    }

    private PaymentDto mapToDto(Payment payment) {
        PaymentDto dto = new PaymentDto();
        dto.setId(payment.getId());
        dto.setAmount(payment.getAmount());
        dto.setMethod(payment.getMethod());
        dto.setStatus(payment.getStatus());
        dto.setBookingId(payment.getBooking().getId());
        return dto;
    }
}
