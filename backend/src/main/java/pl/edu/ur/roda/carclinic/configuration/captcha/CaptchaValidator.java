package pl.edu.ur.roda.carclinic.configuration.captcha;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.ur.roda.carclinic.exception.CaptchaValidationException;

@Component
@RequiredArgsConstructor
public class CaptchaValidator {

    private final CaptchaClient captchaClient;

    public void validate(String captcha) {
        CaptchaValidatorResponse response = captchaClient.getCaptchaValidatorResponse(captcha);
        if(!response.success())
            throw new CaptchaValidationException("Captcha is not valid");
    }
}
