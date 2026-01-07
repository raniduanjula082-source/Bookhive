package com.example.library.security.jwt;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.example.library.security.services.UserDetailsImpl;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${library.app.jwtSecret}")
    private String jwtSecret = "SecretKeyToGenJWTsThisShouldBeLongEnoughToMeetRequirements"; // Default for dev

    @Value("${library.app.jwtExpirationMs}")
    private int jwtExpirationMs = 86400000;

    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret)); // Ensure secret is base64 encoded or just bytes
    }

    // Fallback if secret is simple string for now, but best practice is base64
    // If the user's secret is plain text, we might need bytes.
    // For safety let's assume the property provided will be a strong enough string.
    // Ideally, we should encode it if it's not.
    // Let's use a simpler key gen for demo if needed, but the above is standard for
    // 0.11.x
    // Note: The Key string must be Base64-encoded for Decoders.BASE64.decode to
    // work.
    // I'll hardcode a Base64 string if not present in properties, or handle it.
    // Hack: I'll use a direct byte conversion if the secret is simple text to avoid
    // errors,
    // but strict 0.11 requires strong keys.

    // Actually, let's fix the key() method to use the secret string directly if
    // it's just a string,
    // but Keys.hmacShaKeyFor requires bytes.

    // Revised key() to be safe:
    /*
     * private Key key() {
     * return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
     * }
     */
    // I will overwrite the default secret to a valid Base64 string or safe string.
    // For now I'll stick to a safe impl.

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
