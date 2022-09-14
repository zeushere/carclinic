package pl.edu.ur.roda.carclinic.configuration.captcha;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import pl.edu.ur.roda.carclinic.exception.CaptchaValidatorResponseException;

import java.util.Base64;

@Component
@Slf4j
@RequiredArgsConstructor
class CaptchaClient {

    private final RestTemplate restTemplate;
    private final CaptchaConfiguration captchaConfiguration;

    public CaptchaValidatorResponse getCaptchaValidatorResponse(String captcha) {
        try {
            return restTemplate.postForObject(urlToValidateCaptcha(captcha), null, CaptchaValidatorResponse.class);
        } catch (HttpStatusCodeException e) {
            log.error("While call to validate reCaptcha receive that status code: " + e.getStatusCode() + " | Error message: " + e.getMessage());
            throw new CaptchaValidatorResponseException(e.getStatusCode().value() + " when call to validate captcha endpoint");
        }
    }

    private String urlToValidateCaptcha(String captcha) {
        return UriComponentsBuilder.fromHttpUrl(captchaConfiguration.getUrl())
                .queryParam("secret", decodeSecretKey())
                .queryParam("response", captcha).toUriString();
    }

    private String decodeSecretKey() {
        return new String(Base64.getDecoder().decode(captchaConfiguration.getSecret()));
    }
}
