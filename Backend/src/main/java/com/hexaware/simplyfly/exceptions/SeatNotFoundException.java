package com.hexaware.simplyfly.exceptions;

public class SeatNotFoundException  extends RuntimeException {
	
    public  SeatNotFoundException (String msg){
    	super(msg); 
    }
}
