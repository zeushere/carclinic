package pl.edu.ur.roda.carclinic.configuration.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RequiredArgsConstructor
@Slf4j
class AuthorizationFilter extends OncePerRequestFilter {

    private static final String TOKEN_PREFIX = "Bearer ";

    private final JWTManager jwtManager;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authorization != null && authorization.startsWith(TOKEN_PREFIX)) {
            try {
                String token = authorization.replace(TOKEN_PREFIX, "");
                SecurityContextHolder.getContext().setAuthentication(jwtManager.validateToken(token));
                filterChain.doFilter(request, response);
            } catch (JWTVerificationException e) {
                displayAuthorizationError(response, e);
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }

    private void displayAuthorizationError(HttpServletResponse response, Exception exception) throws IOException {
        Map<String, String> error = new HashMap<>();
        error.put("error_message", exception.getMessage());
        response.setStatus(UNAUTHORIZED.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getOutputStream(), error);
        log.warn("Error while authorization filter. Message: {}", exception.getMessage());
    }
}