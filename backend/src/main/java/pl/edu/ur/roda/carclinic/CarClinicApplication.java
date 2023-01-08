package pl.edu.ur.roda.carclinic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
@ConfigurationPropertiesScan
@EnableAsync
@EnableScheduling
public class CarClinicApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarClinicApplication.class, args);
	}
}
