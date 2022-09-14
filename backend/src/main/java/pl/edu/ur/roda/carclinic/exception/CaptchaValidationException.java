package pl.edu.ur.roda.carclinic.exception;

import org.springframework.security.core.AuthenticationException;

public class CaptchaValidationException extends AuthenticationException {

    public CaptchaValidationException(String message) {
        super(message);
    }
}