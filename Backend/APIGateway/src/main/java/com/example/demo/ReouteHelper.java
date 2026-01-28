package com.example.demo;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class ReouteHelper {  // fixed class name typo

    @Bean
    CorsWebFilter corsWebFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // your frontend URL
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setExposedHeaders(Arrays.asList("Authorization"));

        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("E-FarmingLoginApi-1", r -> r.path("/api1/**")
                .uri("http://localhost:8081"))
            .route("E-FarmingLoginApi-2", r -> r.path("/api2/**")
                .uri("http://localhost:8081"))
            .route("Customer_Service", r -> r.path("/api/customer/**")
                .uri("http://localhost:8082"))
            .route("Farmer_Service", r -> r.path("/api/farmer/**")
                .uri("http://localhost:8083"))
            .route("Admin_Backend",r->r.path("/api/**")
					 .uri("http://localhost:5046"))
					 //.uri("lb://CustAdd"))	
            .build();
    }

}
