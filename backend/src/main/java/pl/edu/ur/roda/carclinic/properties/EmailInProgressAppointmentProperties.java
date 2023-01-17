package pl.edu.ur.roda.carclinic.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mail.in-progress-appointment")
@Data
public class EmailInProgressAppointmentProperties {
    private String subject;
    private String pathToMessage;
}
