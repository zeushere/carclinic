package pl.edu.ur.roda.carclinic.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mail.sender")
@Data
public class MailProperties {
    private int port;
    private String host;
    private String user;
    private String password;
    private Boolean debug = false;
}
