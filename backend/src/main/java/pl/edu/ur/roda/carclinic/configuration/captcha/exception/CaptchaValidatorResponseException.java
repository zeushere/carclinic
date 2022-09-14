package pl.edu.ur.roda.carclinic.configuration.captcha.exception;

import org.springframework.security.core.AuthenticationException;

public class CaptchaValidatorResponseException extends AuthenticationException {

    public CaptchaValidatorResponseException(String msg) {
        super(msg);
    }
}
