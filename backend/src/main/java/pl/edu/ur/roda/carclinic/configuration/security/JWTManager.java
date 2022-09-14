package pl.edu.ur.roda.carclinic.configuration.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JWTManager {

    private final JWTConfiguration jwtConfiguration;

    public String generateToken(User user) {
        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtConfiguration.getExpirationTime().toMillis()))
                .withClaim("roles", getRolesAsStringList(user.getAuthorities()))
                .sign(getAlgorithm());
    }

    public UsernamePasswordAuthenticationToken validateToken(String token) {
        DecodedJWT verifiedToken = JWT.require(getAlgorithm()).build().verify(token);
        String playerId = verifiedToken.getSubject();
        Collection<SimpleGrantedAuthority> authorities = getAuthoritiesCollection(getRoles(verifiedToken));
        return new UsernamePasswordAuthenticationToken(playerId, null, authorities);
    }

    private String[] getRoles(DecodedJWT verifiedToken) {
        return verifiedToken.getClaim("roles").asArray(String.class);
    }

    private List<String> getRolesAsStringList(Collection<GrantedAuthority> grantedAuthorities) {
        return grantedAuthorities.stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
    }

    private Collection<SimpleGrantedAuthority> getAuthoritiesCollection(String[] roles) {
        return Arrays.stream(roles)
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC512(jwtConfiguration.getSecret());
    }
}
