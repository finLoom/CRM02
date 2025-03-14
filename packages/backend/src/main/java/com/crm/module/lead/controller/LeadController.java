package main.java.com.crm.module.lead.controller;
   
import main.java.com.crm.module.lead.dto.LeadDto;
import main.java.com.crm.module.lead.service.LeadService;
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
    
    // Controller methods using DTOs
    // ...
}