// packages/backend/src/main/java/com/crm/module/opportunity/controller/OpportunityController.java
package main.java.com.crm.module.opportunity.controller;

import main.java.com.crm.module.opportunity.dto.OpportunityDto;
import main.java.com.crm.module.opportunity.service.OpportunityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opportunities")
@Tag(name = "Opportunities", description = "Opportunity Management API")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class OpportunityController {
    private final OpportunityService opportunityService;
    
    @GetMapping
    @Operation(summary = "Get all opportunities")
    public ResponseEntity<List<OpportunityDto>> getAllOpportunities() {
        return ResponseEntity.ok(opportunityService.getAllOpportunities());
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get opportunity by ID")
    public ResponseEntity<OpportunityDto> getOpportunityById(@PathVariable Long id) {
        return ResponseEntity.ok(opportunityService.getOpportunityById(id));
    }
    
    @PostMapping
    @Operation(summary = "Create a new opportunity")
    public ResponseEntity<OpportunityDto> createOpportunity(@RequestBody OpportunityDto opportunityDto) {
        return new ResponseEntity<>(opportunityService.createOpportunity(opportunityDto), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update an existing opportunity")
    public ResponseEntity<OpportunityDto> updateOpportunity(@PathVariable Long id, @RequestBody OpportunityDto opportunityDto) {
        return ResponseEntity.ok(opportunityService.updateOpportunity(id, opportunityDto));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an opportunity")
    public ResponseEntity<Void> deleteOpportunity(@PathVariable Long id) {
        boolean deleted = opportunityService.deleteOpportunity(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/batch")
    @Operation(summary = "Delete multiple opportunities")
    public ResponseEntity<Integer> deleteOpportunities(@RequestBody List<Long> ids) {
        int deletedCount = opportunityService.deleteOpportunities(ids);
        return ResponseEntity.ok(deletedCount);
    }
    
    @GetMapping("/account/{accountName}")
    @Operation(summary = "Get opportunities by account name")
    public ResponseEntity<List<OpportunityDto>> getOpportunitiesByAccountName(@PathVariable String accountName) {
        return ResponseEntity.ok(opportunityService.getOpportunitiesByAccountName(accountName));
    }
    
    @GetMapping("/stage/{stage}")
    @Operation(summary = "Get opportunities by stage")
    public ResponseEntity<List<OpportunityDto>> getOpportunitiesByStage(@PathVariable String stage) {
        return ResponseEntity.ok(opportunityService.getOpportunitiesByStage(stage));
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Get opportunities by status (Open or Closed)")
    public ResponseEntity<List<OpportunityDto>> getOpportunitiesByStatus(@PathVariable String status) {
        return ResponseEntity.ok(opportunityService.getOpportunitiesByStatus(status));
    }
    
    @GetMapping("/assignee/{assignee}")
    @Operation(summary = "Get opportunities by assignee")
    public ResponseEntity<List<OpportunityDto>> getOpportunitiesByAssignee(@PathVariable String assignee) {
        return ResponseEntity.ok(opportunityService.getOpportunitiesByAssignee(assignee));
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search opportunities")
    public ResponseEntity<List<OpportunityDto>> searchOpportunities(@RequestParam String query) {
        return ResponseEntity.ok(opportunityService.searchOpportunities(query));
    }
}