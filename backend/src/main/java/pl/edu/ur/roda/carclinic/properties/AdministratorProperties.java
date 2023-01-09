package pl.edu.ur.roda.carclinic.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "administrator")
@ConstructorBinding
public record AdministratorProperties (

        String baseUrl,
        String email
) {

}
