package com.enterprise.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;

@Configuration
public class DatabaseDiagnosticConfig {
    private static final Logger logger = LoggerFactory.getLogger(DatabaseDiagnosticConfig.class);

    @Autowired
    private Environment env;

    @Autowired
    private DataSource dataSource;

    @PostConstruct
    public void diagnosticDatabaseConnection() {
        // Log database connection details
        logger.info("Database URL: {}", env.getProperty("spring.datasource.url"));
        logger.info("Database Username: {}", env.getProperty("spring.datasource.username"));

        // Test database connection
        try (Connection connection = dataSource.getConnection()) {
            logger.info("Database Product Name: {}", connection.getMetaData().getDatabaseProductName());
            logger.info("Database Product Version: {}", connection.getMetaData().getDatabaseProductVersion());
            logger.info("Database Connection Valid: {}", connection.isValid(5));
        } catch (SQLException e) {
            logger.error("Database Connection Failed", e);
        }
    }

    @PostConstruct
    public void listAllTables() {
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            ResultSet tables = metaData.getTables(null, "public", "%", new String[]{"TABLE"});
            
            logger.info("Tables in the database:");
            while (tables.next()) {
                String tableName = tables.getString("TABLE_NAME");
                logger.info("Found table: {}", tableName);
            }
        } catch (SQLException e) {
            logger.error("Error listing tables", e);
        }
    }
}