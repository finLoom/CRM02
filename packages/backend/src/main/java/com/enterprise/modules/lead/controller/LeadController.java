package com.enterprise.modules.lead.controller;
   
import com.enterprise.modules.lead.dto.LeadDto;
import com.enterprise.modules.lead.service.LeadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@Tag(name = "Leads", description = "Lead Management API")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor



public class LeadController {
    private final LeadService leadService;
    
    @GetMapping
    @Operation(summary = "Get all leads")
    public ResponseEntity<List<LeadDto>> getAllLeads() {
        return ResponseEntity.ok(leadService.getAllLeads());
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get lead by ID")
    public ResponseEntity<LeadDto> getLeadById(@PathVariable Long id) {
        return ResponseEntity.ok(leadService.getLeadById(id));
    }
    
    @PostMapping
    @Operation(summary = "Create a new lead")
    public ResponseEntity<LeadDto> createLead(@RequestBody LeadDto leadDto) {
        return new ResponseEntity<>(leadService.createLead(leadDto), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update an existing lead")
    public ResponseEntity<LeadDto> updateLead(@PathVariable Long id, @RequestBody LeadDto leadDto) {
        return ResponseEntity.ok(leadService.updateLead(id, leadDto));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a lead")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        boolean deleted = leadService.deleteLead(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Get leads by status")
    public ResponseEntity<List<LeadDto>> getLeadsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(leadService.getLeadsByStatus(status));
    }
    
    @GetMapping("/assignee/{assignee}")
    @Operation(summary = "Get leads by assignee")
    public ResponseEntity<List<LeadDto>> getLeadsByAssignee(@PathVariable String assignee) {
        return ResponseEntity.ok(leadService.getLeadsByAssignee(assignee));
    }
}