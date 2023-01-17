package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.edu.ur.roda.carclinic.entity.Appointment;
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.exception.FileNoExistException;
import pl.edu.ur.roda.carclinic.properties.EmailCompleteAppointmentProperties;
import pl.edu.ur.roda.carclinic.properties.EmailCompleteAppointmentRemoteProperties;
import pl.edu.ur.roda.carclinic.util.filestorage.FileStorage;

import javax.mail.util.ByteArrayDataSource;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Scanner;

@Service
@EnableConfigurationProperties({EmailCompleteAppointmentProperties.class, EmailCompleteAppointmentRemoteProperties.class})
@RequiredArgsConstructor
@Slf4j
public class EmailCompleteAppointmentService {

    private final EmailCompleteAppointmentProperties completeAppointmentProperties;
    private final EmailCompleteAppointmentRemoteProperties emailCompleteAppointmentRemoteProperties;
    private final JavaMailSender javaMailSender;
    private final FileStorage fileStorage;

    @Async
    public void sendConfirmationEmail(EmailCompleteAppointmentRequest completeAppointmentRequest) {
        javaMailSender.send((mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(completeAppointmentRequest.user.getEmail());
            message.setSubject(completeAppointmentProperties.getSubject());
            log.info("Sending confirmation email complete appointment to {} with subject {}", completeAppointmentRequest.user.getEmail(), completeAppointmentProperties.getSubject());
            message.setText(loadTextMessage(completeAppointmentRequest), true);
            message.addInline("image", loadImage());
        }
        ));
    }

    @Async
    public void sendConfirmationEmailRemote(EmailCompleteAppointmentRequest completeAppointmentRequest) {
        javaMailSender.send((mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(completeAppointmentRequest.user.getEmail());
            message.setSubject(emailCompleteAppointmentRemoteProperties.getSubject());
            log.info("Sending confirmation email complete appointment to {} with subject {}", completeAppointmentRequest.user.getEmail(), emailCompleteAppointmentRemoteProperties.getSubject());
            message.setText(loadTextMessageRemote(completeAppointmentRequest), true);
            message.addInline("image", loadImage());
        }
        ));
    }
    private ByteArrayDataSource loadImage() throws IOException {
        return new ByteArrayDataSource(fileStorage.getFileBytes("backend/src/main/resources/files/email/email-complete.png"), fileStorage.getFileType("backend/src/main/resources/files/email/email-contact.png"));
    }

    private String loadTextMessage(EmailCompleteAppointmentRequest completeAppointmentRequest) {
        return getMessageFromFile(completeAppointmentRequest.user().getFirstName(), completeAppointmentRequest.mechanicalService().getName(), completeAppointmentRequest.appointment().getDate(), completeAppointmentRequest.appointment().getFromTime());
    }

    private String loadTextMessageRemote(EmailCompleteAppointmentRequest completeAppointmentRequest) {
        return getRemoteMessageFromFile(completeAppointmentRequest.user().getFirstName(), completeAppointmentRequest.mechanicalService().getName(), completeAppointmentRequest.appointment().getDate(), completeAppointmentRequest.appointment().getFromTime());
    }

    private String getRemoteMessageFromFile(
            String userName,
            String mechanicalService,
            LocalDate appointmentDate,
            LocalTime appointmentTime) {
        StringBuilder stringBuilder = new StringBuilder();
        try (Scanner scanner = new Scanner(getFileWithRemoteMessage())) {
            while (scanner.hasNextLine()) {
                stringBuilder.append(scanner.nextLine()).append("\n");
            }
        }
        String message = stringBuilder.toString();

        return String.format(message, userName, mechanicalService, appointmentDate, appointmentTime);
    }

    private String getMessageFromFile(
            String userName,
            String mechanicalService,
            LocalDate appointmentDate,
            LocalTime appointmentTime) {
        StringBuilder stringBuilder = new StringBuilder();
        try (Scanner scanner = new Scanner(getFile())) {
            while (scanner.hasNextLine()) {
                stringBuilder.append(scanner.nextLine()).append("\n");
            }
        }
        String message = stringBuilder.toString();

        return String.format(message, userName, mechanicalService, appointmentDate, appointmentTime);
    }

    private InputStream getFileWithRemoteMessage() {
        InputStream resource = getClass().getResourceAsStream(emailCompleteAppointmentRemoteProperties.getPathToMessage());
        log.info("Getting email template file from  properties: {}", emailCompleteAppointmentRemoteProperties.getPathToMessage());
        if (resource == null)
            throw new FileNoExistException();
        return resource;
    }

    private InputStream getFile() {
        InputStream resource = getClass().getResourceAsStream(completeAppointmentProperties.getPathToMessage());
        log.info("Getting email template file from  properties: {}", completeAppointmentProperties.getPathToMessage());
        if (resource == null)
            throw new FileNoExistException();
        return resource;
    }

    record EmailCompleteAppointmentRequest(Appointment appointment,
                                           User user,
                                           pl.edu.ur.roda.carclinic.entity.MechanicalService mechanicalService,
                                           MultipartFile image) {

        static EmailCompleteAppointmentService.EmailCompleteAppointmentRequest of(Appointment appointment, User user, Car car, MechanicalService mechanicalService, MultipartFile image) {
            return new EmailCompleteAppointmentRequest(
                    appointment,
                    user,
                    mechanicalService,
                    image
            );
        }
    }
}
