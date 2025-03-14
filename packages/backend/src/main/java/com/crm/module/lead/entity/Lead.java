package main.java.com.crm.module.lead.entity;
   
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Lead {
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
    
    // Convenience method to get full name
    public String getFullName() {
        return firstName + " " + lastName;
    }
}