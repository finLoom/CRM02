package main.java.com.crm.config;

import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Configuration
public class DataSourceConfig {
    private static final Logger logger = LoggerFactory.getLogger(DataSourceConfig.class);

    @Value("${spring.datasource.url}")
    private String jdbcUrl;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${spring.datasource.driver-class-name}")
    private String driverClassName;

    @Bean
    @Primary
    public DataSource dataSource() {
        // Log diagnostic information
        logger.info("Configuring DataSource with the following properties:");
        logger.info("JDBC URL: {}", jdbcUrl);
        logger.info("Username: {}", username);
        logger.info("Driver Class: {}", driverClassName);

        HikariDataSource dataSource = new HikariDataSource();
        
        try {
            // Configure DataSource
            dataSource.setJdbcUrl(jdbcUrl);
            dataSource.setUsername(username);
            dataSource.setPassword(password);
            dataSource.setDriverClassName(driverClassName);

            // Connection pool configurations
            dataSource.setMaximumPoolSize(10);
            dataSource.setMinimumIdle(5);
            dataSource.setConnectionTimeout(30000);
            dataSource.setIdleTimeout(600000);
            dataSource.setMaxLifetime(1800000);

            // Test Connection
            testConnection(dataSource);
        } catch (Exception e) {
            logger.error("Failed to configure DataSource", e);
            throw new RuntimeException("Could not configure DataSource", e);
        }

        return dataSource;
    }

    private void testConnection(DataSource dataSource) {
        try (Connection connection = dataSource.getConnection()) {
            logger.info("Successfully established database connection");
            logger.info("Database Product Name: {}", 
                connection.getMetaData().getDatabaseProductName());
            logger.info("Database Product Version: {}", 
                connection.getMetaData().getDatabaseProductVersion());
        } catch (SQLException e) {
            logger.error("Failed to establish database connection", e);
            throw new RuntimeException("Could not establish database connection", e);
        }
    }
}