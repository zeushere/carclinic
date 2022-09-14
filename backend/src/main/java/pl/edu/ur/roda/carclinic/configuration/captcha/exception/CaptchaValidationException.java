package pl.edu.ur.roda.carclinic.configuration.captcha.exception;

import org.springframework.security.core.AuthenticationException;

public class CaptchaValidationException extends AuthenticationException {

    public CaptchaValidationException(String message) {
        super(message);
    }
}
