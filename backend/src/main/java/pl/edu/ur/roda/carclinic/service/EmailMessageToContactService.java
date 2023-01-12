package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.dto.EmailContactDto;
import pl.edu.ur.roda.carclinic.properties.MailProperties;

@Service
@EnableConfigurationProperties(MailProperties.class)
@RequiredArgsConstructor
@Slf4j
public class EmailMessageToContactService {

    private final JavaMailSender javaMailSender;
    private final MailProperties mailProperties;

    @Async
    public void sendEmailToContact(EmailContactDto emailContactDto) {
        javaMailSender.send((mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(mailProperties.getUser());
            message.setSubject("Prośba o kontakt od " + emailContactDto.name() + " Email: " + emailContactDto.email());
            log.info("Sending email to contact by {}", emailContactDto.email());
            message.setText(emailContactDto.message(), true);
        }
        ));
    }
}
