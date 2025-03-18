// src/main/java/com/crm/modules/lead/service/LeadServiceImpl.java
package com.enterprise.modules.lead.service;

import com.enterprise.modules.lead.dto.LeadDto;
import com.enterprise.modules.lead.entity.Lead;
import com.enterprise.modules.lead.mapper.LeadMapper;
import com.enterprise.modules.lead.repository.LeadRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeadServiceImpl implements LeadService {
    private final LeadRepository leadRepository;
    private final LeadMapper leadMapper;
    
    @PostConstruct
    public void init() {
        // Create dummy data only if repository is empty
        if (leadRepository.count() == 0) {
            createDummyLeads();
        }
    }

    @Autowired
    private DataSource dataSource;



    @PostConstruct
    public void printDatabaseInfo() {
        try {
            Connection conn = dataSource.getConnection();
            System.out.println("DATABASE PRODUCT: " + conn.getMetaData().getDatabaseProductName());
            System.out.println("DATABASE URL: " + conn.getMetaData().getURL());
        } catch (SQLException e) {
            e.printStackTrace();
        }
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
        
        // createLead(LeadDto.builder()
        //         .firstName("Sarah")
        //         .lastName("Johnson")
        //         .email("sarah.johnson@example.com")
        //         .phone("(555) 234-5678")
        //         .company("XYZ Industries")
        //         .status("Contacted")
        //         .source("Referral")
        //         .estimatedValue(8500.0)
        //         .assignedTo("Jane Cooper")
        //         .build());
        
        // createLead(LeadDto.builder()
        //         .firstName("Michael")
        //         .lastName("Brown")
        //         .email("michael.brown@example.com")
        //         .phone("(555) 345-6789")
        //         .company("Global Tech")
        //         .status("Qualified")
        //         .source("LinkedIn")
        //         .estimatedValue(24000.0)
        //         .assignedTo("Robert Fox")
        //         .build());
        
        // createLead(LeadDto.builder()
        //         .firstName("Emily")
        //         .lastName("Davis")
        //         .email("emily.davis@example.com")
        //         .phone("(555) 456-7890")
        //         .company("Local Services")
        //         .status("New")
        //         .source("Event")
        //         .estimatedValue(5000.0)
        //         .assignedTo("Jane Cooper")
        //         .build());
        
        // createLead(LeadDto.builder()
        //         .firstName("Robert")
        //         .lastName("Wilson")
        //         .email("robert.wilson@example.com")
        //         .phone("(555) 567-8901")
        //         .company("Big Enterprises")
        //         .status("Contacted")
        //         .source("Cold Call")
        //         .estimatedValue(15000.0)
        //         .assignedTo("Robert Fox")
        //         .build());
    }
    
     
    @Override
    public List<LeadDto> getAllLeads() {
        return leadRepository.findAll().stream()
                .map(leadMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public LeadDto getLeadById(Long id) {
        return leadRepository.findById(id)
                .map(leadMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Lead not found with id: " + id));
    }
    
    @Override
    public LeadDto createLead(LeadDto leadDto) {
        Lead lead = leadMapper.toEntity(leadDto);
        
        // Set timestamps
        LocalDateTime now = LocalDateTime.now();
        lead.setCreatedAt(now);
        lead.setUpdatedAt(now);
        
        Lead savedLead = leadRepository.save(lead);
        return leadMapper.toDto(savedLead);
    }
    
    @Override
    public LeadDto updateLead(Long id, LeadDto leadDto) {
        Lead existingLead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found with id: " + id));
        
        leadMapper.updateEntityFromDto(leadDto, existingLead);
        existingLead.setUpdatedAt(LocalDateTime.now());
        
        Lead updatedLead = leadRepository.save(existingLead);
        return leadMapper.toDto(updatedLead);
    }
    
    @Override
    public boolean deleteLead(Long id) {
        if (leadRepository.existsById(id)) {
            leadRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    @Override
    public List<LeadDto> getLeadsByStatus(String status) {
        return leadRepository.findByStatus(status).stream()
                .map(leadMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<LeadDto> getLeadsByAssignee(String assignee) {
        return leadRepository.findByAssignedTo(assignee).stream()
                .map(leadMapper::toDto)
                .collect(Collectors.toList());
    }
}