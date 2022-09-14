package pl.edu.ur.roda.carclinic.configuration.captcha;

import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
@Setter
@ConfigurationProperties(prefix = "rest.connection")
public class RestTemplateConfig {

    private Duration connectionRequestTimeout = Duration.ofSeconds(20);
    private Duration readTimeout = Duration.ofSeconds(30);

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder) {
        return restTemplateBuilder
                .setConnectTimeout(connectionRequestTimeout)
                .setReadTimeout(readTimeout)
                .build();
    }
}
