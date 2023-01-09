package pl.edu.ur.roda.carclinic.configuration.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import pl.edu.ur.roda.carclinic.configuration.captcha.CaptchaValidator;

@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
public class SecurityConfig {
    private static final String[] PERMITS_URLS = {
            "/login", "/register","/hello", "/password-reset", "/request-password-reset", "/working-periods/{mechanicalServiceId}","/mechanical-services", "/swagger-ui/**", "/v2/api-docs", "/configuration/ui",
            "/swagger-resources/**", "/configuration/security", "/swagger-ui.html", "/webjars/**", "/mail-change-confirmation**"};

    private final JWTManager jwtManager;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final ObjectMapper objectMapper;
    private final CaptchaValidator captchaValidator;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers(PERMITS_URLS).permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/gameinfo","/gameinfo/").permitAll();
        http.authorizeRequests().antMatchers("/gameinfo","/gameinfo/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/admin/**").hasAuthority("ADMIN");
        http.authorizeRequests().anyRequest().authenticated();
        http.exceptionHandling().authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
        http.addFilter(new AuthenticationFilter(authenticationManager(authenticationConfiguration), jwtManager, objectMapper, captchaValidator));
        http.addFilterBefore(new AuthorizationFilter(jwtManager, objectMapper), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsFilter corsFilter(@Value("${cors.allowUrl}") String allowUrl) {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin(allowUrl);
        config.addAllowedHeader(allowUrl);
        config.addAllowedMethod(allowUrl);
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}

