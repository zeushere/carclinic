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
import pl.edu.ur.roda.carclinic.properties.EmailInProgressAppointmentProperties;
import pl.edu.ur.roda.carclinic.util.filestorage.FileStorage;

import javax.mail.util.ByteArrayDataSource;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Scanner;

@Service
@EnableConfigurationProperties({EmailInProgressAppointmentProperties.class})
@RequiredArgsConstructor
@Slf4j
public class EmailInProgressAppointmentService {
    private final EmailInProgressAppointmentProperties emailInProgressAppointmentProperties;
    private final JavaMailSender javaMailSender;
    private final FileStorage fileStorage;

    @Async
    public void sendConfirmationEmail(EmailInProgressAppointmentRequest emailInProgressAppointmentRequest) {
        javaMailSender.send((mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(emailInProgressAppointmentRequest.user.getEmail());
            message.setSubject(emailInProgressAppointmentProperties.getSubject());
            log.info("Sending confirmation email in progress appointment to {} with subject {}", emailInProgressAppointmentRequest.user.getEmail(), emailInProgressAppointmentProperties.getSubject());
            message.setText(loadTextMessage(emailInProgressAppointmentRequest), true);
            message.addInline("image", loadImage());
        }));
    }

    private ByteArrayDataSource loadImage() throws IOException {
        return new ByteArrayDataSource(fileStorage.getFileBytes("backend/src/main/resources/files/email/email-in-progress.png"), fileStorage.getFileType("backend/src/main/resources/files/email/email-contact.png"));
    }

    private ByteArrayDataSource loadImage(MultipartFile image) throws IOException {
        return new ByteArrayDataSource(image.getBytes(), image.getContentType());
    }

    private String loadTextMessage(EmailInProgressAppointmentRequest emailInProgressAppointmentRequest) {
        return getMessageFromFile(emailInProgressAppointmentRequest.user().getFirstName(), emailInProgressAppointmentRequest.mechanicalService().getName(), emailInProgressAppointmentRequest.appointment().getDate(), emailInProgressAppointmentRequest.appointment().getFromTime());
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


    private InputStream getFile() {
        InputStream resource = getClass().getResourceAsStream(emailInProgressAppointmentProperties.getPathToMessage());
        log.info("Getting email template file from  properties: {}", emailInProgressAppointmentProperties.getPathToMessage());
        if (resource == null)
            throw new FileNoExistException();
        return resource;
    }

    record EmailInProgressAppointmentRequest(Appointment appointment,
                                             User user,
                                             pl.edu.ur.roda.carclinic.entity.MechanicalService mechanicalService) {

        static EmailInProgressAppointmentRequest of(Appointment appointment, User user, MechanicalService mechanicalService) {
            return new EmailInProgressAppointmentRequest(
                    appointment,
                    user,
                    mechanicalService
            );
        }
    }
}
