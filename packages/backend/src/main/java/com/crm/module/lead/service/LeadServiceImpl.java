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
    
    // Implementation of service methods using mapper for DTO conversion
    // ...
}