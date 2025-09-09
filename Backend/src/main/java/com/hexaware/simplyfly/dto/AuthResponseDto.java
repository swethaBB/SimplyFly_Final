package com.hexaware.simplyfly.dto;

import com.fasterxml.jackson.annotation.JsonProperty;


/*Author : Swetha
Modified On : 29-07-2025
Description : AuthResponseDto with basic validation
*/

public class AuthResponseDto {

    @JsonProperty("access_token")
    private final String token;

    public AuthResponseDto(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
