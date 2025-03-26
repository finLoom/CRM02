# Continuation Prompt for New Conversation

Use the following prompt to continue development in a new conversation:

```
I'm working on an enterprise React application with Vite and TypeScript that follows an Azure DevOps-style structure. I've implemented the core architecture with the following components:

### 1. Multi-level sidebar navigation with:
   - Collapsible tree structure
   - Search functionality
   - Collapse/expand toggle

2. Enterprise topbar with:
   - Project selection dropdown
   - Global search
   - Notifications
   - User profile
   - Settings and help menus

3. Module pages for:
   - Overview
   - Boards (with work items, backlogs, sprints)
   - Repositories (with files, commits, pull requests)
   - Pipelines (with builds, releases)
   - Test Plans
   - Analytics (with dashboards, reports)

4. Core architecture components:
   - TypeScript type definitions
   - Service-based navigation
   - Lazy-loaded routes
   - Fluent UI integration

I need help implementing [SPECIFIC FEATURE], focusing on proper TypeScript typing and following the established enterprise architecture patterns. Here's the current implementation of related components:

[PASTE RELEVANT CODE]

Please help me implement this feature while maintaining the existing architecture and TypeScript type safety.
```

Replace the placeholders with specific information about the feature you want to implement and include any relevant code to provide context.

## Example Specific Features You Might Request:

1. "A form wizard component for creating new work items, with proper validation and multi-step progress"

2. "A dashboard widget system that allows for draggable and resizable widgets with different chart types"

3. "An advanced filtering system for the work items list with saved filters and complex query building"

4. "A real-time notification system with websocket integration and unread message tracking"

5. "A theme provider that supports light, dark, and custom themes with TypeScript type safety"

6. "An authentication system with role-based access control and protected routes"

These specific requests will help you continue developing the application with a focused approach while maintaining the enterprise-level architecture and TypeScript type safety.

--------------------------------

Memorize this: Please create the code using Fluent UI. Follow these guidelines:

1. Use only imports from '@fluentui/react-components' (not @fluentui/react)
2. Apply styling with makeStyles from Griffel
3. Implement the slots pattern for component customization
4. Use only confirmed available icons from @fluentui/react-icons
5. Follow modern v9 patterns (avoid deprecated v8 approaches)

Development approach:
1. Focus on modifying only a few files at a time to ensure code is working before proceeding
2. Keep files under 200 lines of code
3. Follow a modular approach with separate files for each functionality
4. Always include the full folder path as the first line comment in each file
5. Create separate files for data services and mock data
6. Store configuration in static data files instead of hardcoding values

Please provide complete, working code that follows these enterprise-level best practices.