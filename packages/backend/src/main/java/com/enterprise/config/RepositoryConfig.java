package com.enterprise.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = {
        "com.enterprise.modules.tasks.repository",
        "com.enterprise.core.team.repository",
        "com.enterprise.core.user.repository",
        "com.enterprise.modules.lead.repository"
})
public class RepositoryConfig {
    // Configuration is empty, just enabling repositories with specific package scanning
}