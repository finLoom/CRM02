// src/main/java/com/crm/module/lead/entity/Lead.java
package main.java.com.crm.module.lead.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "leads")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String company;
    private String status;
    private String source;
    private Double estimatedValue;
    private String assignedTo;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @Transient
    public String getFullName() {
        return firstName + " " + lastName;
    }
}