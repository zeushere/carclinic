package pl.edu.ur.roda.carclinic.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedProcessException extends RuntimeException {
    public UnauthorizedProcessException(){
        super("Unauthorized process exception " + HttpStatus.UNAUTHORIZED);
    }
}
