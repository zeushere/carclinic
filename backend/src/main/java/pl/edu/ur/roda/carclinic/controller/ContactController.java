package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.ur.roda.carclinic.dto.EmailContactDto;
import pl.edu.ur.roda.carclinic.service.EmailMessageToContactService;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
public class ContactController {

    private final EmailMessageToContactService emailMessageToContactService;

    @PostMapping
    void sendEmailMessageToContact(@RequestBody EmailContactDto emailContactDto) {
        emailMessageToContactService.sendEmailToContact(emailContactDto);
    }
}
