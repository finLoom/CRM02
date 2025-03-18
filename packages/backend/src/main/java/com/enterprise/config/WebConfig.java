package com.enterprise.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Web configuration for the application.
 * Configures CORS to allow frontend access to the API.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    private static final Logger logger = LoggerFactory.getLogger(WebConfig.class);

    /**
     * Configure CORS globally for all endpoints
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        logger.info("Configuring CORS mappings");
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Your frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    /**
     * CORS filter for more detailed configuration
     */
    @Bean
    public CorsFilter corsFilter() {
        logger.info("Setting up CORS filter");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow frontend origin
        config.addAllowedOrigin("http://localhost:3000");

        // Allow cookies and authentication headers
        config.setAllowCredentials(true);

        // Allow all headers
        config.addAllowedHeader("*");

        // Allow all methods
        config.addAllowedMethod("*");

        source.registerCorsConfiguration("/**", config);
        logger.info("CORS filter configured successfully");
        return new CorsFilter(source);
    }
}