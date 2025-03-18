// packages/backend/src/main/java/com/crm/modules/contacts/controller/ContactController.java
package com.enterprise.modules.contacts.controller;

import com.enterprise.modules.contacts.dto.ContactDto;
import com.enterprise.modules.contacts.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@Tag(name = "Contacts", description = "Contact Management API")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ContactController {
    private final ContactService contactService;
    
    @GetMapping
    @Operation(summary = "Get all contacts")
    public ResponseEntity<List<ContactDto>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get contacts by ID")
    public ResponseEntity<ContactDto> getContactById(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getContactById(id));
    }
    
    @PostMapping
    @Operation(summary = "Create a new contacts")
    public ResponseEntity<ContactDto> createContact(@RequestBody ContactDto contactDto) {
        return new ResponseEntity<>(contactService.createContact(contactDto), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update an existing contacts")
    public ResponseEntity<ContactDto> updateContact(@PathVariable Long id, @RequestBody ContactDto contactDto) {
        return ResponseEntity.ok(contactService.updateContact(id, contactDto));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a contacts")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        boolean deleted = contactService.deleteContact(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    @GetMapping("/account/{accountName}")
    @Operation(summary = "Get contacts by account name")
    public ResponseEntity<List<ContactDto>> getContactsByAccountName(@PathVariable String accountName) {
        return ResponseEntity.ok(contactService.getContactsByAccountName(accountName));
    }
    
    @GetMapping("/assignee/{assignee}")
    @Operation(summary = "Get contacts by assignee")
    public ResponseEntity<List<ContactDto>> getContactsByAssignee(@PathVariable String assignee) {
        return ResponseEntity.ok(contactService.getContactsByAssignee(assignee));
    }
}