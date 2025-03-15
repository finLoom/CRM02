// packages/backend/src/main/java/com/crm/module/contact/entity/Contact.java
package com.enterprise.module.contact.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.beans.Transient;
import java.time.LocalDateTime;

@Entity
@Table(name = "contacts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;
    
    private String email;
    private String phone;
    private String mobile;
    private String title;
    private String department;
    private String accountName;
    private String reportingManager;
    
    @Column(name = "mailing_street")
    private String mailingStreet;
    
    @Column(name = "mailing_city")
    private String mailingCity;
    
    @Column(name = "mailing_state")
    private String mailingState;
    
    @Column(name = "mailing_zip")
    private String mailingZip;
    
    @Column(name = "mailing_country")
    private String mailingCountry;
    
    private String assignedTo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @Transient
    public String getFullName() {
        return firstName + " " + lastName;
    }
}