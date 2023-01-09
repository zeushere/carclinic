package pl.edu.ur.roda.carclinic.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mail.complete-appointment-remote")
@Data
public class EmailCompleteAppointmentRemoteProperties {
        private String subject;
        private String pathToMessage;
    }
