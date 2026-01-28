package com.example.demo.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // Secret key must be at least 64 bytes for HS512
    private static final String SECRET = "eFarmingPlatformSecretKeyJWT256bit!1234567890eFarmingPlatformSecretKeyJWT256bit!"; 
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    // Generate JWT token using user email
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    // Extract username (subject) from token
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Validate token with user details
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // Check if the token is expired
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // Extract all claims from token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
