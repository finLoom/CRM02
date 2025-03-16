# Token Optimization Strategies for API Conversations

When working on a large project like your enterprise CRM system, optimizing token usage is crucial for effective communication. Here are strategies to make the most of your token allocation in our conversations:

## Token-Efficient Communication Patterns

### 1. Use Specific Requests and References

- **Be specific about what you need**: "I need a TaskFilterComponent for the tasks module" is better than "Let's continue with the tasks feature"
- **Reference specific file paths**: "Update packages/frontend/src/modules/leads/components/LeadList.jsx" is clearer than "Update the lead list component"
- **Specify component responsibilities**: "The component should filter tasks by status, date range, and assignee" provides clear scope

### 2. Use Artifacts Effectively

- **Request complete components via artifacts**: This provides code in a structured way without consuming conversation tokens
- **Refer to artifact IDs**: "Modify the component from artifact lead-form-123" is more efficient than pasting code
- **Request updates to specific artifacts**: "Update the LeadForm component in artifact lead-form-123 to add validation"

### 3. Efficient Module Development

- **Focus on one module at a time**: Complete leads module before moving to contacts
- **Develop module components sequentially**: Create list view, then detail view, then form components
- **Prioritize critical path components**: Focus on core functionality before edge cases

## Request Format Templates

### New Component Request

```
Create a new [ComponentName] in [file path]:

Purpose: [Short description of component's purpose]
Props: [List of props with types]
Dependencies: [List of imports needed]
Behavior: [Description of component behavior]
```

### Component Update Request

```
Update [file path]:

Change: [Description of what needs to change]
Reason: [Why the change is needed]
Specific elements to modify: [List of functions/sections to change]
```

### Module Structure Request

```
Create module structure for [Module Name]:

Required components:
- [List of components needed]

Required services:
- [List of services needed]

Page structure:
- [List of pages needed]
```

## Tips for New Conversations

1. **Begin with the continuity prompt**: Start conversations by sharing the CRM Frontend Project Continuity Prompt
2. **Focus the session goal**: Clearly state what you want to accomplish in the current session
3. **Identify priority components**: List the specific components you plan to work on
4. **Reference existing patterns**: Point to similar implementations that should be followed
5. **Use artifacts for code delivery**: Request full component code as artifacts

## Optimizing Session Output

1. **Ask for incremental artifact creation**: Request components one by one as artifacts
2. **Review artifacts before requesting more**: Make sure components meet requirements before moving on
3. **Request targeted modifications**: "Change the filter function in the artifact" rather than "Redo the component"
4. **Use updates instead of rewrites**: For small changes, request artifact updates instead of complete rewrites

## Tips for Multi-Session Development

1. **Review progress at the end of sessions**: Summarize what's been completed and what's next
2. **Create numbered task lists**: Break down work into specific, numbered tasks
3. **Reference previous session artifacts**: "Continue from artifact lead-form-123 from our last session"
4. **Maintain component/artifact mapping**: Keep track of which artifacts contain which components

## Sample Optimized Request

```
Using the CRM Frontend Project Continuity Prompt as reference, please create:

1. A LeadFilterComponent for packages/frontend/src/modules/leads/components/LeadFilter.jsx that:
   - Accepts current filter state as props
   - Emits filter change events
   - Uses Fluent UI components
   - Has filters for status, date range, and assignment

2. Integration code showing how to use this component in LeadsPage

Please deliver these as separate artifacts, following the module structure in the continuity prompt.
```

By following these guidelines, we can maintain a focused, efficient development process that makes the most of available tokens while ensuring high-quality code that meets your enterprise architecture standards.
