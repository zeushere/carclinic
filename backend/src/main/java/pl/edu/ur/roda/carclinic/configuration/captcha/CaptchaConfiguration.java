package pl.edu.ur.roda.carclinic.configuration.captcha;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(value = "captcha")
class CaptchaConfiguration {

    private String secret;
    private String url;
}
