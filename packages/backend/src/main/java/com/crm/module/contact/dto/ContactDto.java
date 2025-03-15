// packages/backend/src/main/java/com/crm/module/contact/dto/ContactDto.java
package main.java.com.crm.module.contact.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String mobile;
    private String title;
    private String department;
    private String accountName;
    private String reportingManager;
    private String mailingStreet;
    private String mailingCity;
    private String mailingState;
    private String mailingZip;
    private String mailingCountry;
    private String assignedTo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}