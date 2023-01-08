package pl.edu.ur.roda.carclinic.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mail.add-appointment-to-employee")
@Data
public class EmailAddAppointmentToEmployeeProperties {
    private String subject;
    private String pathToMessage;
}

