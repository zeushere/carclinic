package pl.edu.ur.roda.carclinic.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mail.contact")
@Data
public class ContactNotificationProperties {
    private String pathToMessage;
}
