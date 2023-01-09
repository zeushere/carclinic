package pl.edu.ur.roda.carclinic.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mail.send-notification")
@Data
public class EmailSendNotificationProperties {
    private String subject;
    private String pathToMessage;
}