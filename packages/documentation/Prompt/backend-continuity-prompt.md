# CRM Backend Project Continuity Prompt

I'm continuing work on my enterprise-level CRM system built with Java Spring Boot backend. To ensure continuity across our conversations:

## Current Project Context

1. The CRM follows a modular architecture with reusable components that will be used across multiple applications.
2. The backend is built as a monorepo with a clear separation between core domain objects and module-specific implementations.
3. Core domain entities are in `com.enterprise.core.*` packages
4. Module-specific implementations are in `com.enterprise.module.*` packages

## Technology Stack

- **Spring Boot 3.1.5** as the core framework
- **Spring Data JPA** for data access
- **Spring Security** for authentication and authorization
- **PostgreSQL** as the primary database
- **HikariCP** for connection pooling
- **Lombok** for reducing boilerplate code
- **Swagger/OpenAPI** for API documentation

## Detailed Project Structure

```
packages/backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── enterprise/
│   │   │           ├── CrmApplication.java                         # Application entry point
│   │   │           ├── config/                                     # Configuration classes
│   │   │           │   ├── DataSourceConfig.java                   # Database connection configuration
│   │   │           │   ├── DatabaseDiagnosticConfig.java           # Database diagnostic utilities
│   │   │           │   ├── JpaConfig.java                          # JPA/Hibernate configuration
│   │   │           │   ├── RepositoryConfig.java                   # Repository configuration
│   │   │           │   └── SecurityConfig.java                     # Security settings
│   │   │           ├── core/                                       # Core domain objects
│   │   │           │   ├── common/                                 # Shared components
│   │   │           │   │   ├── dto/
│   │   │           │   │   │   └── ApiResponse.java                # Common API response
│   │   │           │   │   ├── entity/
│   │   │           │   │   │   └── BaseEntity.java                 # Base entity with common fields
│   │   │           │   │   ├── exception/
│   │   │           │   │   │   └── ResourceNotFoundException.java  # Common exception
│   │   │           │   │   └── service/
│   │   │           │   │       └── BaseService.java                # Generic service implementation
│   │   │           │   ├── task/                                   # Task management
│   │   │           │   │   ├── controller/
│   │   │           │   │   │   └── TaskController.java             # Task REST endpoints
│   │   │           │   │   ├── dto/
│   │   │           │   │   │   ├── TaskCreateDto.java              # Task creation DTO
│   │   │           │   │   │   ├── TaskDto.java                    # Task data DTO
│   │   │           │   │   │   ├── TaskRelatedObjectCreateDto.java # Related object creation DTO
│   │   │           │   │   │   └── TaskRelatedObjectDto.java       # Related object data DTO
│   │   │           │   │   ├── entity/
│   │   │           │   │   │   ├── Task.java                       # Task entity
│   │   │           │   │   │   ├── TaskModule.java                 # Task module enum
│   │   │           │   │   │   ├── TaskPriority.java               # Task priority enum
│   │   │           │   │   │   ├── TaskRelatedObject.java          # Task related object entity
│   │   │           │   │   │   └── TaskStatus.java                 # Task status enum
│   │   │           │   │   ├── mapper/
│   │   │           │   │   │   └── TaskMapper.java                 # Task entity-DTO mapper
│   │   │           │   │   ├── repository/
│   │   │           │   │   │   ├── TaskRelatedObjectRepository.java # Task related object repository
│   │   │           │   │   │   └── TaskRepository.java             # Task repository
│   │   │           │   │   └── service/
│   │   │           │   │       ├── TaskService.java                # Task service interface
│   │   │           │   │       └── impl/
│   │   │           │   │           └── TaskServiceImpl.java        # Task service implementation
│   │   │           │   ├── team/                                   # Team management
│   │   │           │   │   ├── controller/
│   │   │           │   │   │   └── TeamController.java             # Team REST endpoints
│   │   │           │   │   ├── dto/
│   │   │           │   │   │   ├── TeamCreateDto.java              # Team creation DTO
│   │   │           │   │   │   ├── TeamDto.java                    # Team data DTO
│   │   │           │   │   │   ├── TeamMemberDto.java              # Team member DTO
│   │   │           │   │   │   └── TeamUpdateDto.java              # Team update DTO
│   │   │           │   │   ├── entity/
│   │   │           │   │   │   ├── Team.java                       # Team entity
│   │   │           │   │   │   └── TeamType.java                   # Team type enum
│   │   │           │   │   ├── repository/
│   │   │           │   │   │   └── TeamRepository.java             # Team repository
│   │   │           │   │   └── service/
│   │   │           │   │       ├── TeamService.java                # Team service interface
│   │   │           │   │       └── impl/
│   │   │           │   │           └── TeamServiceImpl.java        # Team service implementation
│   │   │           │   └── user/                                   # User management
│   │   │           │       ├── controller/
│   │   │           │       │   └── UserController.java             # User REST endpoints
│   │   │           │       ├── dto/
│   │   │           │       │   ├── UserCreateDto.java              # User creation DTO
│   │   │           │       │   ├── UserDto.java                    # User data DTO
│   │   │           │       │   └── UserUpdateDto.java              # User update DTO
│   │   │           │       ├── entity/
│   │   │           │       │   ├── User.java                       # User entity
│   │   │           │       │   └── UserRole.java                   # User role enum
│   │   │           │       ├── repository/
│   │   │           │       │   └── UserRepository.java             # User repository
│   │   │           │       └── service/
│   │   │           │           ├── UserService.java                # User service interface
│   │   │           │           └── impl/
│   │   │           │               └── UserServiceImpl.java        # User service implementation
│   │   │           └── module/                                     # Module-specific implementations
│   │   │               ├── common/                                 # Common module components
│   │   │               │   └── exception/
│   │   │               │       ├── GlobalExceptionHandler.java     # Global exception handler
│   │   │               │       └── ResourceNotFoundException.java  # Module-specific not found exception
│   │   │               ├── contact/                                # Contact management module
│   │   │               │   ├── controller/
│   │   │               │   │   └── ContactController.java          # Contact REST endpoints
│   │   │               │   ├── dto/
│   │   │               │   │   └── ContactDto.java                 # Contact data DTO
│   │   │               │   ├── entity/
│   │   │               │   │   └── Contact.java                    # Contact entity
│   │   │               │   ├── mapper/
│   │   │               │   │   ├── ContactMapper.java              # Contact mapper interface
│   │   │               │   │   └── ContactMapperImpl.java          # Contact mapper implementation
│   │   │               │   ├── repository/
│   │   │               │   │   └── ContactRepository.java          # Contact repository
│   │   │               │   └── service/
│   │   │               │       ├── ContactService.java             # Contact service interface
│   │   │               │       └── ContactServiceImpl.java         # Contact service implementation
│   │   │               ├── lead/                                   # Lead management module
│   │   │               │   ├── controller/
│   │   │               │   │   └── LeadController.java             # Lead REST endpoints
│   │   │               │   ├── dto/
│   │   │               │   │   └── LeadDto.java                    # Lead data DTO
│   │   │               │   ├── entity/
│   │   │               │   │   └── Lead.java                       # Lead entity
│   │   │               │   ├── mapper/
│   │   │               │   │   ├── LeadMapper.java                 # Lead mapper interface
│   │   │               │   │   └── LeadMapperImpl.java             # Lead mapper implementation
│   │   │               │   ├── repository/
│   │   │               │   │   └── LeadRepository.java             # Lead repository
│   │   │               │   └── service/
│   │   │               │       ├── LeadService.java                # Lead service interface
│   │   │               │       └── LeadServiceImpl.java            # Lead service implementation
│   │   │               └── opportunity/                            # Opportunity management module
│   │   │                   ├── controller/
│   │   │                   │   └── OpportunityController.java      # Opportunity REST endpoints
│   │   │                   ├── dto/
│   │   │                   │   └── OpportunityDto.java             # Opportunity data DTO
│   │   │                   ├── entity/
│   │   │                   │   └── Opportunity.java                # Opportunity entity
│   │   │                   ├── mapper/
│   │   │                   │   ├── OpportunityMapper.java          # Opportunity mapper interface
│   │   │                   │   └── OpportunityMapperImpl.java      # Opportunity mapper implementation
│   │   │                   ├── repository/
│   │   │                   │   └── OpportunityRepository.java      # Opportunity repository
│   │   │                   └── service/
│   │   │                       ├── OpportunityService.java         # Opportunity service interface
│   │   │                       └── OpportunityServiceImpl.java     # Opportunity service implementation
│   │   └── resources/
│   │       ├── application.properties                              # Main application properties
│   │       ├── application-dev.properties                          # Development environment properties
│   │       └── application-prod.properties                         # Production environment properties
│   └── test/                                                       # Test directory
└── pom.xml                                                         # Maven project configuration
```

## Recently Modified/Created Files
<!-- This section tracks recent changes to help maintain context across conversations -->
<!-- Format: YYYY-MM-DD | filename | brief description of changes -->

<!--
Example:
- 2025-03-16 | packages/backend/src/main/java/com/enterprise/module/email/entity/EmailTemplate.java | Created new email template entity
- 2025-03-16 | packages/backend/src/main/java/com/enterprise/config/SecurityConfig.java | Updated security config to implement JWT
-->

- <!-- Add your recent changes here -->


## Current Modules Implementation

### Core Modules

1. **User Management**
   - Basic user entity with profile information
   - User creation, retrieval, updating, and deletion
   - Department-based user organization
   - Manager-subordinate relationships
   - Files:
     - `core/user/entity/User.java` - User entity with core attributes
     - `core/user/service/UserService.java` - User management interface
     - `core/user/service/impl/UserServiceImpl.java` - Implementation of user operations
     - `core/user/repository/UserRepository.java` - Data access for users
     - `core/user/controller/UserController.java` - REST endpoints for user management

2. **Team Management**
   - Team creation and management
   - Team member assignment
   - Different team types (Operations, Sales, Support, etc.)
   - Team activation/deactivation
   - Files:
     - `core/team/entity/Team.java` - Team entity
     - `core/team/entity/TeamType.java` - Enum for different team types
     - `core/team/service/TeamService.java` - Team management interface
     - `core/team/service/impl/TeamServiceImpl.java` - Implementation of team operations
     - `core/team/repository/TeamRepository.java` - Data access for teams
     - `core/team/controller/TeamController.java` - REST endpoints for team management

3. **Task Management**
   - Comprehensive task tracking system
   - Task assignment to users and teams
   - Hierarchical tasks (parent-child relationships)
   - Task relationships with other entities
   - Task status and priority tracking
   - Files:
     - `core/task/entity/Task.java` - Task entity
     - `core/task/entity/TaskStatus.java` - Enum for task statuses
     - `core/task/entity/TaskPriority.java` - Enum for task priorities
     - `core/task/entity/TaskModule.java` - Enum for task module categories
     - `core/task/entity/TaskRelatedObject.java` - Entity for task relationships
     - `core/task/service/TaskService.java` - Task management interface
     - `core/task/service/impl/TaskServiceImpl.java` - Implementation of task operations
     - `core/task/repository/TaskRepository.java` - Data access for tasks
     - `core/task/controller/TaskController.java` - REST endpoints for task management

### Business Modules

1. **Contact Management**
   - Contact CRUD operations
   - Filtering by account and assignee
   - Contact details with address information
   - Files:
     - `module/contact/entity/Contact.java` - Contact entity
     - `module/contact/dto/ContactDto.java` - Contact data transfer object
     - `module/contact/service/ContactService.java` - Contact management interface
     - `module/contact/service/ContactServiceImpl.java` - Implementation of contact operations
     - `module/contact/repository/ContactRepository.java` - Data access for contacts
     - `module/contact/controller/ContactController.java` - REST endpoints for contact management

2. **Lead Management**
   - Lead tracking
   - Status management
   - Assignee management
   - Source tracking
   - Files:
     - `module/lead/entity/Lead.java` - Lead entity
     - `module/lead/dto/LeadDto.java` - Lead data transfer object
     - `module/lead/service/LeadService.java` - Lead management interface
     - `module/lead/service/LeadServiceImpl.java` - Implementation of lead operations
     - `module/lead/repository/LeadRepository.java` - Data access for leads
     - `module/lead/controller/LeadController.java` - REST endpoints for lead management

3. **Opportunity Management**
   - Sales opportunity tracking
   - Stage progression
   - Amount and probability tracking
   - Close date management
   - Files:
     - `module/opportunity/entity/Opportunity.java` - Opportunity entity
     - `module/opportunity/dto/OpportunityDto.java` - Opportunity data transfer object
     - `module/opportunity/service/OpportunityService.java` - Opportunity management interface
     - `module/opportunity/service/OpportunityServiceImpl.java` - Implementation of opportunity operations
     - `module/opportunity/repository/OpportunityRepository.java` - Data access for opportunities
     - `module/opportunity/controller/OpportunityController.java` - REST endpoints for opportunity management

## Development Focus

For today's session, I need assistance with:
[SPECIFY CURRENT FOCUS AREA - e.g., "Adding email communication module", "Enhancing security implementation", "Creating account management module"]

## Relevant Files

The following files are crucial for understanding the current task:
- [LIST KEY FILES HERE - e.g., "UserService.java", "SecurityConfig.java"]
- [INCLUDE DEPENDENCY RELATIONSHIPS - e.g., "The new EmailService will depend on UserService for recipient information"]

## Module Development Status

<!-- Use this section to track development status of different modules -->
<!-- Format: Module Name | Status | Last Updated | Next Steps -->

| Module | Status | Last Updated | Next Steps |
|--------|--------|--------------|------------|
| User Management | Implemented | 2025-03-16 | Add role-based access control |
| Team Management | Implemented | 2025-03-16 | Add team performance metrics |
| Task Management | Implemented | 2025-03-16 | Add recurring tasks |
| Contact Management | Implemented | 2025-03-16 | Add contact merging |
| Lead Management | Implemented | 2025-03-16 | Add lead scoring |
| Opportunity Management | Implemented | 2025-03-16 | Add pipeline analytics |
| Email Communication | Planned | - | Create module structure |
| Document Management | Planned | - | Create module structure |
<!-- Add new modules as they are developed -->

## Previously Made Architectural Decisions

1. Clear separation between core domain objects and module-specific implementations
2. Use of DTOs for API communication
3. Mapper classes for entity-DTO conversions
4. Repository pattern for data access
5. Service layer for business logic
6. Controller layer for API endpoints
7. Base entity with common fields (id, created_at, updated_at)
8. Generic service implementation for common CRUD operations

## Today's Development Goals

1. [SPECIFY GOAL 1]
2. [SPECIFY GOAL 2]
3. [SPECIFY GOAL 3]

## For New Code

- Please create all substantial code as artifacts rather than inline code blocks
- Ask explicitly about dependencies rather than making assumptions
- If you need additional context about existing components, please ask specifically
- Follow the established package structure and naming conventions
- Ensure proper error handling and validation
- Include Javadoc comments for public methods
- Follow established patterns for controllers, services, repositories, etc.

## Additional Notes

- The application currently uses in-memory authentication, but will be migrated to JWT-based auth
- PostgreSQL is the primary database, but H2 can be used for testing
- The system should be easily extended with new modules
- Code quality standards:
  - Every file should not exceed 500 lines of code
  - All public methods should have Javadoc comments
  - Follow established design patterns (Repository, Service, DTO)
  - Include proper validation and error handling
  - Write code that is testable and follows SOLID principles

## New Module Creation Template

When creating a new module, follow this structure:

```
module/[module-name]/
├── controller/
│   └── [Entity]Controller.java      # REST endpoints
├── dto/
│   ├── [Entity]Dto.java             # Data transfer object
│   ├── [Entity]CreateDto.java       # Creation DTO (if needed)
│   └── [Entity]UpdateDto.java       # Update DTO (if needed)
├── entity/
│   └── [Entity].java                # JPA entity
├── mapper/
│   ├── [Entity]Mapper.java          # Mapper interface
│   └── [Entity]MapperImpl.java      # Mapper implementation
├── repository/
│   └── [Entity]Repository.java      # Data access
└── service/
    ├── [Entity]Service.java         # Service interface
    └── impl/
        └── [Entity]ServiceImpl.java # Service implementation
```

## Integration Checklist

When integrating a new module:
- [ ] Add repository scan in RepositoryConfig.java if needed
- [ ] Configure security settings in SecurityConfig.java
- [ ] Update documentation
- [ ] Add migration scripts if needed
- [ ] Update tests
- [ ] Verify API compatibility

Please confirm you understand this context before proceeding with today's development tasks.
