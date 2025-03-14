package main.java.com.crm.module.lead.service;

import main.java.com.crm.module.lead.dto.LeadDto;
import main.java.com.crm.module.lead.entity.Lead;
import main.java.com.crm.module.lead.mapper.LeadMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeadServiceImpl implements LeadService {
    // In-memory store for leads
    private final Map<Long, Lead> leadsMap = new HashMap<>();
    private final AtomicLong idCounter = new AtomicLong(1);
    
    private final LeadMapper leadMapper;
    
    // Initialize with dummy data
    @PostConstruct
    public void init() {
        createDummyLeads();
    }
    
    /**
     * Create dummy leads for testing
     */
    private void createDummyLeads() {
        // Add sample leads
        createLead(LeadDto.builder()
                .firstName("John")
                .lastName("Smith")
                .email("john.smith@example.com")
                .phone("(555) 123-4567")
                .company("Acme Corp")
                .status("New")
                .source("Website")
                .estimatedValue(15000.0)
                .assignedTo("Jane Cooper")
                .build());
        
        createLead(LeadDto.builder()
                .firstName("Sarah")
                .lastName("Johnson")
                .email("sarah.johnson@example.com")
                .phone("(555) 234-5678")
                .company("XYZ Industries")
                .status("Contacted")
                .source("Referral")
                .estimatedValue(8500.0)
                .assignedTo("Jane Cooper")
                .build());
        
        createLead(LeadDto.builder()
                .firstName("Michael")
                .lastName("Brown")
                .email("michael.brown@example.com")
                .phone("(555) 345-6789")
                .company("Global Tech")
                .status("Qualified")
                .source("LinkedIn")
                .estimatedValue(24000.0)
                .assignedTo("Robert Fox")
                .build());
        
        createLead(LeadDto.builder()
                .firstName("Emily")
                .lastName("Davis")
                .email("emily.davis@example.com")
                .phone("(555) 456-7890")
                .company("Local Services")
                .status("New")
                .source("Event")
                .estimatedValue(5000.0)
                .assignedTo("Jane Cooper")
                .build());
        
        createLead(LeadDto.builder()
                .firstName("Robert")
                .lastName("Wilson")
                .email("robert.wilson@example.com")
                .phone("(555) 567-8901")
                .company("Big Enterprises")
                .status("Contacted")
                .source("Cold Call")
                .estimatedValue(15000.0)
                .assignedTo("Robert Fox")
                .build());
    }
    
    @Override
    public List<LeadDto> getAllLeads() {
        return leadsMap.values().stream()
                .map(leadMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public LeadDto getLeadById(Long id) {
        Lead lead = leadsMap.get(id);
        if (lead == null) {
            throw new RuntimeException("Lead not found with id: " + id);
        }
        return leadMapper.toDto(lead);
    }
    
    @Override
    public LeadDto createLead(LeadDto leadDto) {
        Lead lead = leadMapper.toEntity(leadDto);
        
        // Set generated ID if not provided
        if (lead.getId() == null) {
            lead.setId(idCounter.getAndIncrement());
        }
        
        // Set timestamps
        LocalDateTime now = LocalDateTime.now();
        lead.setCreatedAt(now);
        lead.setUpdatedAt(now);
        
        // Save to map
        leadsMap.put(lead.getId(), lead);
        
        return leadMapper.toDto(lead);
    }
    
    @Override
    public LeadDto updateLead(Long id, LeadDto leadDto) {
        Lead existingLead = leadsMap.get(id);
        if (existingLead == null) {
            throw new RuntimeException("Lead not found with id: " + id);
        }
        
        // Update the lead with DTO values
        leadMapper.updateEntityFromDto(leadDto, existingLead);
        
        // Update ID and timestamps
        existingLead.setId(id);
        existingLead.setUpdatedAt(LocalDateTime.now());
        
        // Save updated lead
        leadsMap.put(id, existingLead);
        
        return leadMapper.toDto(existingLead);
    }
    
    @Override
    public boolean deleteLead(Long id) {
        if (!leadsMap.containsKey(id)) {
            return false;
        }
        
        leadsMap.remove(id);
        return true;
    }
    
    @Override
    public List<LeadDto> getLeadsByStatus(String status) {
        return leadsMap.values().stream()
                .filter(lead -> status.equals(lead.getStatus()))
                .map(leadMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<LeadDto> getLeadsByAssignee(String assignee) {
        return leadsMap.values().stream()
                .filter(lead -> assignee.equals(lead.getAssignedTo()))
                .map(leadMapper::toDto)
                .collect(Collectors.toList());
    }
}