package pl.edu.ur.roda.carclinic.configuration.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private static final String TOKEN_PREFIX = "Bearer ";
    private final AuthenticationManager authenticationManager;
    private final JWTManager jwtManager;
    private final ObjectMapper objectMapper;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        LoginCredentials authRequest = getLoginCredentials(request);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                authRequest.username(),
                authRequest.password()
        );
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authentication) throws IOException {
        User user = (User) authentication.getPrincipal();
        String generateToken = jwtManager.generateToken(user);
        response.setHeader(HttpHeaders.AUTHORIZATION, TOKEN_PREFIX + generateToken);

        Map<String, String> token = new HashMap<>();
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        token.put("token", generateToken);
        objectMapper.writeValue(response.getOutputStream(), token);
    }

    private LoginCredentials getLoginCredentials(HttpServletRequest request) {
        try {
            return objectMapper.readValue(request.getReader(), LoginCredentials.class);
        } catch (IOException e) {
            throw new BadCredentialsException("Error while reading login credentials fields");
        }
    }
}