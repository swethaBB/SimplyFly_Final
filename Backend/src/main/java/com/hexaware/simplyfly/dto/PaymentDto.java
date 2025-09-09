package com.hexaware.simplyfly.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {

    private Long id;

    @Positive(message = "Amount must be positive")
    private Double amount;

    @NotBlank(message = "Payment method is mandatory")
    @Pattern(regexp = "^(CARD|UPI|NET_BANKING)$", message = "Payment method must be CARD, UPI, or NET_BANKING")
    private String method;

    @Pattern(regexp = "^(PENDING|SUCCESS|FAILED|REFUNDED)$", message = "Status must be PENDING, SUCCESS, FAILED, or REFUNDED")
    private String status;

    private Long bookingId;
}
