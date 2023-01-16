package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.dto.EmailContactDto;
import pl.edu.ur.roda.carclinic.exception.FileNoExistException;
import pl.edu.ur.roda.carclinic.properties.ContactNotificationProperties;
import pl.edu.ur.roda.carclinic.properties.MailProperties;
import pl.edu.ur.roda.carclinic.util.filestorage.FileStorage;

import javax.mail.util.ByteArrayDataSource;
import java.io.IOException;
import java.io.InputStream;
import java.util.Scanner;

@Service
@EnableConfigurationProperties(MailProperties.class)
@RequiredArgsConstructor
@Slf4j
public class EmailMessageToContactService {

    private final JavaMailSender javaMailSender;
    private final MailProperties mailProperties;
    private final FileStorage fileStorage;
    private final ContactNotificationProperties contactNotificationProperties;

    @Async
    public void sendEmailToContact(EmailContactDto emailContactDto) {
        javaMailSender.send((mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(mailProperties.getUser());
            message.setSubject("Prośba o kontakt od " + emailContactDto.name() + " Email: " + emailContactDto.email());
            log.info("Sending email to contact by {}", emailContactDto.email());
            message.setText(loadTextMessage(emailContactDto), true);
            message.addInline("image", loadImage());
        }
        ));
    }

    private ByteArrayDataSource loadImage() throws IOException {
        return new ByteArrayDataSource(fileStorage.getFileBytes("backend/src/main/resources/files/email/email-contact.png"), fileStorage.getFileType("backend/src/main/resources/files/email/email-contact.png"));
    }

    private String loadTextMessage(EmailContactDto emailContactDto) {
        return getMessageFromFile(emailContactDto.name(), emailContactDto.message());
    }

    private String getMessageFromFile(
            String userName,
            String text) {
        StringBuilder stringBuilder = new StringBuilder();
        try (Scanner scanner = new Scanner(getFile())) {
            while (scanner.hasNextLine()) {
                stringBuilder.append(scanner.nextLine()).append("\n");
            }
        }
        String message = stringBuilder.toString();
        return String.format(message, userName, text);
    }

    private InputStream getFile() {
        InputStream resource = getClass().getResourceAsStream(contactNotificationProperties.getPathToMessage());
        log.info("Getting email template file from properties: {}", contactNotificationProperties.getPathToMessage());
        if (resource == null)
            throw new FileNoExistException();
        return resource;
    }
}
